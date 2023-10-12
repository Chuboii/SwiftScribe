import { Client, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652754ea38f387f8d4ee');
    
export const db = new Databases(client)
 
export const storage = new Storage(client);

