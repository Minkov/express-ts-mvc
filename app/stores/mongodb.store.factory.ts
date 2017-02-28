import { Store } from "express-session";
import * as session from "express-session";
import { Db } from "mongodb";
import * as connectMongo from "connect-mongo";

import { BaseStoreFactory } from "./base/base.store.factory";

export class MongoDbStoreFactory implements BaseStoreFactory {
    db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public getStore(): Store {
        const MongoStore = connectMongo(session);
        return new MongoStore({
            db: this.db
        });
    }
}