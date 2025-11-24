const { ethers } = require("ethers");
const db = require("./src/core/database");
const networks = require("./config/networks");
const chalk = require("chalk");

// PILIH NETWORK DISINI (berachain atau sepolia)
const TARGET_NETWORK = networks.sepolia;

console.log(chalk.blue(`📡 Connecting to ${TARGET_NETWORK.name}...`));

const provider = new ethers.JsonRpcProvider(TARGET_NETWORK.rpcUrl);

async function checkBalances() {
  db.all("SELECT address, group_id FROM wallets", [], async (err, rows) => {
    if (err) throw err;

    console.log(`Memeriksa saldo ${rows.length} wallet... (Mohon tunggu)\n`);

    let fundedCount = 0;

    // Kita loop tapi pakai Promise.all biar agak cepet (Batching 5 wallet)
    // Note: Jangan terlalu barbar requestnya biar IP gak kena limit RPC
    for (const row of rows) {
      try {
        const balanceWei = await provider.getBalance(row.address);
        const balanceEth = ethers.formatEther(balanceWei);

        if (parseFloat(balanceEth) > 0.001) {
          console.log(
            chalk.green(
              `[Group ${row.group_id}] ${row.address} : ${balanceEth} ${TARGET_NETWORK.currencySymbol} ✅`
            )
          );
          fundedCount++;
        } else {
          // Kalau kosong gak usah diprint biar terminal bersih, atau print abu-abu
          // console.log(chalk.gray(`[Group ${row.group_id}] ${row.address} : ${balanceEth} (Kosong)`));
        }
      } catch (e) {
        console.log(chalk.red(`Error checking ${row.address}: ${e.message}`));
      }
    }

    console.log(chalk.yellow(`\n📊 Laporan Akhir:`));
    console.log(chalk.green(`💰 Wallet Terisi: ${fundedCount}`));
    console.log(chalk.red(`💀 Wallet Kosong: ${rows.length - fundedCount}`));
  });
}

checkBalances();
