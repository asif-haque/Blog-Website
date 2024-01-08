import { Client, Databases, Storage, Query, ID } from "appwrite";
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
  // These are only some of the services, I can choose the service (methods) from the
  // docs according to my need.

  async createBlog({ title, slug, content, featuredImg, status, userId }) {
    try {
      return await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite :: createBlog :: error : ", error);
    }
  }

  async getBlog(slug) {
    // Get a document by its unique ID. This endpoint response returns a JSON object with the document data.
    try {
      return await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: getBlog :: error : ", error);
      return false;
    }
  }

  async getBlogs() {
    try {
      // we have to use query to filter all the documents with active status (our index) while fetching from DB
      // Query is used to ask for specified data from the database
      return await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("status", true)] // as an array
      );
    } catch (error) {}
  }

  async updateBlog(slug, { title, content, featuredImg, status }) {
    // Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.
    try {
      await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        // the content to be updated, passed as object
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite :: updateBlog :: error : ", error);
    }
  }

  async deleteBlog(slug) {
    try {
      await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true; // manual return 
    } catch (error) {
      console.log("Appwrite :: deleteBlog :: error : ", error);
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
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId).href;  // returning the href prop
  }
}

export const appWriteService = new Service();
