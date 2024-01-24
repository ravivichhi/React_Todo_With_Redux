import { Client, Account, ID } from "appwrite";
import config from '../config/config.js';

export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                this.login({email, password});
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getAccount(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const service = new AuthService()

export default service