import { Store } from "express-session";

export interface BaseStoreFactory {
    getStore(): Store;
}