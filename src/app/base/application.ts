import { BaseRoute } from "./../routes/base/base.route";

export interface Application {
    start(port: number | string);

    addRoute(route: BaseRoute);

    set(key: string, value: any);
    useMiddleware(middleware: any);
    addStaticResource(url: string, pathInFs: string);
}