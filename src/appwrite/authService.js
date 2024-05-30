import { Client, Account, ID } from "appwrite";
import { config } from "../config/config";
import { appWriteService } from "./appwriteService";

export class AuthService {
  // this class has 2 properties (instance variables)
  client;
  account;
  // putting the code inside constructor, so that whenever object gets created, this code run
  // for every auth service, the following code is repeated. That's why the class.
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async signUp({ name, email, password }) {
    try {
      const id = ID.unique();
      
      const acc = await this.account.create(id, email, password, name);
      
      if (acc) {
        // First create the session for the signed in user. Beacuse guest scope is not allowed in performing the createUserInfo operation below
        const session = await this.login({ email, password });
        
        const user = await appWriteService.createUserInfo({
          id: acc.$id,
          name,
          email,
          joinedAt: acc.$createdAt,
        });
        
        if (user) return session;
        else return user; // as user = null
      } else {
        return acc; // we will handle the null account later
      }
    } catch (error) {
      console.log("Error in signing in: ", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Error logging in: ", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite :: getAccount :: error : ", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
