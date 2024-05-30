import {
  Client,
  Databases,
  Storage,
  Query,
  ID,
  Permission,
  Role,
} from "appwrite";
import { config } from "../config/config";

class Service {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // UserInfo Collection
  async createUserInfo({ id, name, email, joinedAt }) {
    try {
      console.log("ID of the document: ", id);
      const user = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionUserInfoId,
        id,
        {
          // data
          name,
          email,
          joinedAt,
        }
      );
      return user;
    } catch (err) {
      console.log("Error creating user in UserInfo collection: ", err);
    }
  }

  // Posts Collection
  async createPost({
    title,
    slug,
    content,
    featuredImg,
    status,
    userId,
    userName,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg, // actually featuredImgId => got from createFile()
          status,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.log("Appwrite :: createPost :: error : ", error);
    }
  }

  async getPost(slug) {
    // Get a document by its unique ID. This endpoint response returns a JSON object with the document data.
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: getPost :: error : ", error);
      return false;
    }
  }

  async getPosts(searchTerm = "") {
    try {
      // we have to use query to filter all the documents with active status (our index) while fetching from DB
      // Query is used to ask for specified data from the database
      if (searchTerm === "")
        return await this.databases.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          [Query.equal("status", [true])]
        );
      else {
        const docsWithTitle = await this.databases.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          [Query.equal("status", true), Query.search("title", searchTerm)]
        );
        const docsWithAuthor = await this.databases.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          [Query.equal("status", true), Query.search("userName", searchTerm)]
        );
        const docs = {
          total: 0,
          documents: [],
        };
        docs.total = docsWithAuthor.total + docsWithTitle.total;
        docs.documents = [
          ...docsWithTitle.documents,
          ...docsWithAuthor.documents,
        ];
        return docs; // JUST BECAUSE F-ING Query.or([]) DOESN'T WORK WITH APPWRITE
      }
    } catch (error) {
      console.log("Error fetching documents : ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImg, status, likes }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        // the content to be updated, passed as object (for optional argument, they are passed as obect)
        { title, content, featuredImg, status, likes },
        [Permission.update(Role.any())]
      );
    } catch (error) {
      console.log("Appwrite :: updatePost :: error : ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true; // manual return
    } catch (error) {
      console.log("Appwrite :: deletePost :: error : ", error);
      return false;
    }
  }

  // FILE HANDLING IN STORAGE : any image or file uploaded in the app
  async uploadFile(file) {
    try {
      // this returns an id for the file, used in delete or update
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: uploadFile :: error : ", error);
      return false;
    }
  }

  async deleteTheFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteTheFile :: error : ", error);
      return false;
    }
  }

  // not async, this is a fast method
  // this is an important feature to make the web app fast
  getTheFilePreview(fileId) {
    // fileId is the ID of the post.featuredImg
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId).href; // returning the href prop
  }
}

export const appWriteService = new Service();
