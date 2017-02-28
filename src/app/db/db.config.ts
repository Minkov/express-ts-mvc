import { Db, MongoClient } from "mongodb";

export class DbConfig {
    static initMongoDb(connectionString: string): Promise<Db> {
        return MongoClient.connect(connectionString);
    }
}