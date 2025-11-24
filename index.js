const { ethers } = require("ethers");
const db = require("./src/core/database");
const networks = require("./config/networks");
const { executeWrapUnwrap } = require("./src/modules/swapper");
const { getRandomDelay } = require("./src/utils/randomizer");
const chalk = require("chalk");

// --- KONFIGURASI TARGET ---
// KITA PAKAI SEPOLIA SEKARANG
const CURRENT_NETWORK = networks.sepolia;

async function main() {
  console.clear();
  console.log(
    chalk.blue.bold(`=== 🤖 PROJECT ZERO-G: AUTO FARMER STARTED ===`)
  );
  console.log(chalk.blue(`Target Network: ${CURRENT_NETWORK.name}`));
  console.log(chalk.blue(`RPC URL: ${CURRENT_NETWORK.rpcUrl}\n`));

  const provider = new ethers.JsonRpcProvider(CURRENT_NETWORK.rpcUrl);

  // Ambil wallet dari database
  db.all("SELECT * FROM wallets", [], async (err, rows) => {
    if (err) throw err;

    console.log(
      chalk.cyan(`Found ${rows.length} wallets in database. Let's go!\n`)
    );

    for (const row of rows) {
      // Sambungkan wallet ke provider
      const wallet = new ethers.Wallet(row.private_key, provider);

      // JALANKAN MISI SWAPPER
      await executeWrapUnwrap(wallet, CURRENT_NETWORK);

      // JEDA ANTAR WALLET (Supaya tidak dikira spam)
      // Kalau walletnya saldonya kosong (di-skip), kita delay cepet aja (1 detik)
      // Kalau walletnya abis transaksi, delay lama (10-30 detik)

      // Karena mayoritas walletmu masih kosong, script ini bakal ngebut nge-skip yang kosong.
      // Nanti pas ketemu wallet yang ada isinya (Wallet 1), dia bakal ngerjain tugas.
    }

    console.log(chalk.blue.bold("=== ROUND FINISHED. SLEEPING... ==="));
    db.close();
  });
}

main();
