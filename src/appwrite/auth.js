import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // FOR CREATE ACCOUNT
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(), // 1st field userId compulsory.
        email,
        password,
        name
      );

      if (userAccount) {
        // Call the login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // FOR LOGGIN
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // FOR VERIFY CURRENT LOGGEDIN USER
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service:: getCurrentUser: ", error);
    }
    return null;
  }

  // FOR LOGOUT THE USER
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service:: logout error: ", error);
    }
  }
}
const authService = new AuthService();

export default authService;
