import { Client, Account, ID } from "appwrite";
import { config } from "../config/config";

export class AuthService {
  // this class has 2 properties (instance variables)
  client;
  account;
  // putting the code inside constructor, so that whenver object gets created, this code run
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async signUp({ name, email, password }) {
    try {
      const acc = await this.account.create(ID.unique(), email, password, name);
      if (acc) {
        // if account is created, call login to directly put the user in the logged in state
        login(email, password);
      } else {
        return acc; // we will handle the null account later
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
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
      // console.log("Appwrite :: getAccount :: error : ", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
