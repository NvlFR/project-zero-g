const db = require("./src/core/database");

console.log("Mengecek 5 wallet pertama di database...");

db.all("SELECT address, group_id FROM wallets LIMIT 5", [], (err, rows) => {
  if (err) throw err;
  console.table(rows);
  db.close();
});
