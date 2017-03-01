import { BaseRoute } from "./routes/base/base.route";
import * as express from "express";

import { Book } from "./models/book.model";
import { BaseData } from "./data/base/base.data";
import { Application } from "./base/application";

export class ExpressApplication implements Application {
    app: express.Application;

    constructor() {
        this.app = express();
    }

    start(port: number | string): Promise<{}> {
        port = +port;
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve();
            });
        });
    }

    public addRoute(route: BaseRoute) {
        let router = route.getRouter();
        this.app.use(router);
    }

    public set(key: string, value: any) {
        this.app.set(key, value);
    }

    public useMiddleware(middleware: any) {
        this.app.use(middleware);
    }

    public addStaticResource(url: string, pathInFs: string) {
        this.app.use(url, express.static(pathInFs));
    }

    getApp(): express.Application {
        return this.app;
    }
}