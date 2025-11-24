const { ethers } = require("ethers");
const { WETH_ABI } = require("../../config/abis"); // Pastikan file abis.js sudah ada
const { getRandomAmount, getRandomDelay } = require("../utils/randomizer");
const chalk = require("chalk");

async function executeWrapUnwrap(wallet, networkConfig) {
  const provider = wallet.provider;
  // Load Contract WETH (Token pembungkus ETH)
  const contract = new ethers.Contract(
    networkConfig.contracts.weth,
    WETH_ABI,
    wallet
  );

  try {
    // 1. CEK SALDO DULU
    const balanceWei = await provider.getBalance(wallet.address);
    const balanceEth = parseFloat(ethers.formatEther(balanceWei));

    // Kalau saldo kurang dari 0.002 ETH, skip aja (biar gak gagal bayar gas)
    if (balanceEth < 0.002) {
      console.log(
        chalk.gray(
          `[${wallet.address.slice(
            0,
            6
          )}..] Saldo tipis/kosong (${balanceEth.toFixed(4)}), Skip.`
        )
      );
      return;
    }

    // 2. TENTUKAN NOMINAL WRAP
    // Kita wrap sedikit aja, antara 0.0001 sampai 0.001 ETH
    const amountToWrap = getRandomAmount(0.0001, 0.001);
    const amountWei = ethers.parseEther(amountToWrap);

    console.log(
      chalk.yellow(
        `[${wallet.address.slice(0, 6)}..] 🔄 Wrapping ${amountToWrap} ${
          networkConfig.currencySymbol
        }...`
      )
    );

    // 3. EKSEKUSI WRAP (Deposit)
    const txWrap = await contract.deposit({ value: amountWei });
    console.log(chalk.white(`   -> Tx Sent! Waiting...`));
    await txWrap.wait(); // Tunggu blockchain konfirmasi
    console.log(
      chalk.green(`   ✅ Wrap Sukses! Hash: ${txWrap.hash.slice(0, 10)}...`)
    );

    // --- JEDA SEBENTAR (Human Behavior) ---
    // Biar seolah-olah mikir dulu sebelum unwrap
    const miniDelay = getRandomDelay(5, 10);
    console.log(
      chalk.gray(`   ☕ Istirahat ${miniDelay / 1000}s sebelum Unwrap...`)
    );
    await new Promise((r) => setTimeout(r, miniDelay));

    // 4. EKSEKUSI UNWRAP (Withdraw) - Balikin lagi jadi ETH
    console.log(
      chalk.magenta(`[${wallet.address.slice(0, 6)}..] ↩️ Unwrapping...`)
    );
    const txUnwrap = await contract.withdraw(amountWei);
    await txUnwrap.wait();
    console.log(
      chalk.green(`   ✅ Unwrap Sukses! Hash: ${txUnwrap.hash.slice(0, 10)}...`)
    );

    console.log(chalk.cyan(`   🎉 Misi Selesai untuk wallet ini.\n`));
  } catch (error) {
    console.log(chalk.red(`[ERROR] ${wallet.address}: ${error.message}`));
  }
}

module.exports = { executeWrapUnwrap };
