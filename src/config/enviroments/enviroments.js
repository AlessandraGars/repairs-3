import 'dotenv/config';
import env from 'env-var';


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DB_URI: env.get('DB_URI').required().asString(),
    JWT_SECRET: env.get('JWT_SECRET').required().asString()
}