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
    } catch (error) {
      console.log("Error creating user in UserInfo collection: ", error);
      throw error;
    }
  }

  async updateUserInfo(id, { name, myPosts, bookmarkedPosts, email }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionUserInfoId,
        id,
        { name, myPosts, bookmarkedPosts, email },
        [Permission.update(Role.any())]
      );
    } catch (error) {
      console.log("Appwrite :: updateUserInfo :: error : ", error);
      throw error;
    }
  }

  async getUserInfo(id) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionUserInfoId,
        // [Query.equal("$id", id)]
        id
      );
    } catch (error) {
      console.log("Appwrite :: getUserInfo :: error : ", error);
      throw error;
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
      const post = await this.databases.createDocument(
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
      throw error;
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
      throw error;
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
          [Query.equal("status", [true]), Query.orderDesc("$createdAt")]
        );
      else {
        const docsWithTitle = await this.databases.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          [
            Query.equal("status", true),
            Query.search("title", searchTerm),
            Query.orderDesc("$createdAt"),
          ]
        );
        const docsWithAuthor = await this.databases.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId,
          [
            Query.equal("status", true),
            Query.search("userName", searchTerm),
            Query.orderDesc("$createdAt"),
          ]
        );

        const docs = {
          total: 0,
          documents: [],
        };
        // merging the result : title prioritized
        docsWithAuthor.documents?.forEach((el) => {
          if (!docsWithTitle.documents.some((el2) => el2.$id === el.$id)) {
            docsWithTitle.documents.push(el);
          }
        });
        docs.total = docsWithTitle.documents.length;
        docs.documents = docsWithTitle.documents;
        return docs;
      }
    } catch (error) {
      console.log("Error fetching documents : ", error);
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async deleteTheFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteTheFile :: error : ", error);
      throw error;
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
