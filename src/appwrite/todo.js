import { Client, Account,Databases, ID, Query } from "appwrite";
import config from '../config/config';

export class TodoService {

    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.client);
    }

    async createTodo({user_id, content, status}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,ID.unique(),{user_id,content,status});
        } catch (error) {
            throw error
        }
    }
    async listTodo({user_id}){
        try {
            const todos = await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,
                                [
                                    Query.equal('user_id',user_id)
                                ]
                                );
            if(todos){
                return todos;
            }
        } catch (error) {
            throw error
        }
    }
    async updateTodo(id,{content}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,id,{content});
        } catch (error) {
            throw error
        }
    }
    async toggleTodo(id,{status}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,id,{status});
        } catch (error) {
            throw error
        }
    }
    async deleteTodo({id}){
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,id);
            return true;
        } catch (error) {
            throw error
            return false;
        }
    }

}

const todoservice = new TodoService();
export default todoservice;