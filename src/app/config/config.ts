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
// "//redis-15543.c8.us-east-1-3.ec2.cloud.redislabs.com:15543"

export {
    connectionString,
    redisConnectionString,
    port,
    secret,

    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH
};