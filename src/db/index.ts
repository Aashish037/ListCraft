import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema/schema'

const dbURL = process.env.DATABASE_URL;
// Disable prefetch as it is not supported for "Transaction" pool mode 
if(!dbURL){
    throw new Error("DATABASE_URL is not defined in the environment variables");
}
const client = postgres(dbURL)
export const db = drizzle(client, {
    schema: schema
});




