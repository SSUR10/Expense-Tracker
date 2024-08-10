import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://expensedb_owner:wPSjl9H5WDBp@ep-proud-grass-a1woro2t.ap-southeast-1.aws.neon.tech/Expensedb?sslmode=require');
export const db = drizzle(sql,{schema});