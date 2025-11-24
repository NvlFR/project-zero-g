const db = require("./src/core/database");

// Ini alamat wallet yang ada saldonya (sesuai info kamu)
const TARGET_ADDRESS = "0x018246c3e16BfD579d32C5916e9b71e9b95bfC12";

console.log(`🔍 Sedang mengobrak-abrik database mencari: ${TARGET_ADDRESS}...`);

db.get(
  "SELECT address, private_key FROM wallets WHERE address = ?",
  [TARGET_ADDRESS],
  (err, row) => {
    if (err) {
      console.error(err.message);
    }

    if (!row) {
      console.log(
        "❌ Waduh, wallet ini gak ketemu di database! Yakin bener database-nya?"
      );
    } else {
      console.log("\n============================================");
      console.log("🎉 KETEMU BOS!");
      console.log("ADDRESS      : " + row.address);
      console.log("PRIVATE KEY  : " + row.private_key);
      console.log("============================================");
      console.log("👉 Copy Private Key itu dan import ke MetaMask sekarang!");
    }

    db.close();
  }
);
