const db = require("./src/core/database");

console.log("Mencari Private Key Wallet #1...");

db.all("SELECT address, private_key FROM wallets LIMIT 1", [], (err, rows) => {
  if (err) throw err;
  const wallet = rows[0];

  console.log("\n============================================");
  console.log("ADDRESS KITA  : " + wallet.address);
  console.log("PRIVATE KEY   : " + wallet.private_key);
  console.log("============================================");
  console.log("⚠️  COPY PRIVATE KEY DI ATAS, JANGAN DISHARE KE SIAPAPUN! ⚠️");

  db.close();
});
