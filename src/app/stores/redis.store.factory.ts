import { Store } from "express-session";
import { BaseStoreFactory } from "./base/base.store.factory";

import * as session from "express-session";
import * as connectRedis from "connect-redis";

let RedisStore = connectRedis(session);

export class RedisStoreFactory implements BaseStoreFactory {
    connectionString: string;
    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public getStore(): Store {
        return new RedisStore({
            url: this.connectionString
        });
    }
}