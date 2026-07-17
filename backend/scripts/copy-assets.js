const fs = require("fs");
const path = require("path");

fs.mkdirSync(path.join(__dirname, "..", "dist", "db"), { recursive: true });
fs.copyFileSync(
  path.join(__dirname, "..", "src", "db", "schema.sql"),
  path.join(__dirname, "..", "dist", "db", "schema.sql")
);

console.log("Assets copiados para dist/.");
