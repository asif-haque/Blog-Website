import { Client, Databases, Storage, Query, ID } from "appwrite";
import { config } from "../config/config";

class Service {
  client;
  databases;
  storage;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

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
    }
  }

  async getBlogs() {
    try {
      // we have to use query to filter all the documents with active status (our index) while fetching from DB
      return await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("status", true)]
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
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteBlog :: error : ", error);
      return false;
    }
  }

  // FILE HANDLING IN STORAGE
  async createTheFile(file) {
    try {
      // this returns an id for the file, used in delete or update
      return await storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: createTheFile :: error : ", error);
      return false;
    }
  }

  async deleteTheFile(fileId) {
    try {
      await storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteTheFile :: error : ", error);
      return false;
    }
  }

  // not async, this is a  fast method
  getTheFilePreview(fileId) {
    return storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}
