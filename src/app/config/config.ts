const connectionString: string =
    process.env.CONNECTION_STRING ||
    "mongodb://localhost/books-db";

const redisConnectionString: string =
    process.env.REDIS_CONNECTION_STRING ||
    "//127.0.0.1:6379";

const port: number = process.env.PORT || 3001;
const secret: string = "purple unicorn";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const smallLetters =
    Array.from({ length: 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1 })
        .map((_: any, i: number) => String.fromCharCode(i + 'a'.charCodeAt(0)))
        .join();
const capitalLetters =
    Array.from({ length: 'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1 })
        .map((_: any, i: number) => String.fromCharCode(i + 'A'.charCodeAt(0)))
        .join();

const digits = Array.from({ length: 10 })
    .map((_: any, n: number) => n)
    .join();

const specialChars = "._";
const USERNAME_VALID_CHARS = smallLetters + capitalLetters + digits + specialChars;

export {
    connectionString,
    redisConnectionString,
    port,
    secret,

    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_VALID_CHARS
};