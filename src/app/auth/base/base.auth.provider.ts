import { Application } from "./../../base/application";
export interface BaseAuthProvider {
    addToApp(app: Application);
}