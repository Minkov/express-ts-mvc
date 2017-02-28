import { Store } from "express-session";
import { BaseStoreFactory } from "./base/base.store.factory";

import * as session from "express-session";
import * as connectRedis from "connect-redis";

let RedisStore = connectRedis(session);

export class RedisStoreFactory implements BaseStoreFactory {
    public getStore(): Store {
        return new RedisStore({
            url: "//redis-15543.c8.us-east-1-3.ec2.cloud.redislabs.com:15543"
        });
    }
}