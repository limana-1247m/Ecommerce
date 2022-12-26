import sqlite3 from "sqlite3";
import path from "path";
const caminhoArq = path.resolve("./src/database/", "database.db")

const db = new sqlite3.Database(caminhoArq)
process.on("SIGINT", () => {
  db.close(() => {
    process.exit(0)
  })});
export default db