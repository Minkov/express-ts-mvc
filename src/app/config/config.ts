const connectionString: string =
    process.env.CONNECTION_STRING ||
    "mongodb://localhost/books-db";
const port: number = process.env.PORT || 3001;
const secret: string = "purple unicorn";

export {
    connectionString,
    port,
    secret
};