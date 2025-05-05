import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
