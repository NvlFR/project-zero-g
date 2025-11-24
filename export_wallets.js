const fs = require("fs");
const db = require("./src/core/database");

console.log("Mengekspor daftar address...");

db.all("SELECT address FROM wallets", [], (err, rows) => {
  if (err) throw err;

  // Gabungkan semua address jadi satu string dipisah baris baru
  const content = rows.map((row) => row.address).join("\n");

  // Simpan ke file txt
  fs.writeFileSync("address_list.txt", content);

  console.log(
    `✅ Sukses! ${rows.length} address disimpan di file 'address_list.txt'`
  );
  console.log("Silakan buka file tersebut untuk copy-paste ke Faucet.");

  db.close();
});
