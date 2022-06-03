import * as dotenv from "dotenv"

dotenv.config();

export const config = {
    url: <string>process.env.MONGO_URL,
    saltRounds: <string>process.env.SALT_ROUNDS,
    pepper: process.env.PEPPER,
    bcryptPasswors: process.env.BCRYPT_PASSWORD,
};