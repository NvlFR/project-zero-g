const { ethers } = require("ethers");
const db = require("./src/core/database");
const logger = require("./src/utils/logger");

// JUMLAH WALLET YANG MAU DIBUAT
const TARGET_WALLET_COUNT = 100;

console.log(
  `\n🚀 Memulai Generator: Target ${TARGET_WALLET_COUNT} Wallets...\n`
);

const generateWallets = () => {
  db.serialize(() => {
    const stmt = db.prepare(
      "INSERT INTO wallets (address, private_key, group_id) VALUES (?, ?, ?)"
    );

    let successCount = 0;

    for (let i = 0; i < TARGET_WALLET_COUNT; i++) {
      // 1. Bikin Wallet Random
      const wallet = ethers.Wallet.createRandom();

      // 2. Tentukan Group ID (Misal kita bagi jadi 5 grup biar rapi manajemennya)
      // Group 1: Wallet 1-20, Group 2: Wallet 21-40, dst.
      const groupId = Math.floor(i / 20) + 1;

      // 3. Simpan ke DB
      stmt.run(wallet.address, wallet.privateKey, groupId, (err) => {
        if (err) {
          logger.error(`Gagal menyimpan wallet: ${err.message}`);
        }
      });

      successCount++;
      // Log biar kelihatan prosesnya (tapi jangan log private key!)
      console.log(
        `[${i + 1}/${TARGET_WALLET_COUNT}] Generated: ${
          wallet.address
        } (Group ${groupId})`
      );
    }

    stmt.finalize();

    console.log(
      `\n✅ SELESAI! ${successCount} wallet berhasil disimpan di 'data/wallets.db'`
    );
    console.log(
      `⚠️  PENTING: Jangan pernah share file 'data/wallets.db' ke siapapun!\n`
    );
  });
};

// Jalankan fungsi
generateWallets();

// Tutup koneksi setelah selesai (kasih jeda dikit biar write process kelar)
setTimeout(() => {
  db.close();
}, 3000);
