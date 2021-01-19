import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 1;
const connectionPool = new Pool({
  hostname: "lallah.db.elephantsql.com",
  database: "ftkcjojp",
  user: "ftkcjojp",
  password: "tZtmt0lfnxfYul8OHs6qRXDDCt87XGg2",
  port: 5432
}, CONCURRENT_CONNECTIONS);

export { connectionPool };
