import "dotenv/config";
import app from "./app.js";
import db from "./db/client.js";

const PORT = process.env.PORT ?? 3000;

await db.connect();
console.log("✅ Connected to Postgres");

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}...`);
});
