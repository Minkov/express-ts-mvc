import * as morgan from "morgan";

export class Logger {
    getLoggerMiddleware() {
        return morgan("combined");
    }
}