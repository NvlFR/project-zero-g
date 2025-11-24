const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const logger = require("../utils/logger");

// Pastikan folder 'data' ada
const dataDir = path.resolve(__dirname, "../../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Lokasi file database
const dbPath = path.join(dataDir, "wallets.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error(`Gagal membuka database: ${err.message}`);
  } else {
    // logger.info('Terhubung ke Database SQLite.');
  }
});

// Setup Tabel jika belum ada
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS wallets (
        address TEXT PRIMARY KEY,
        private_key TEXT,
        group_id INTEGER DEFAULT 1,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

  // Tabel history transaksi (untuk Phase selanjutnya)
  db.run(`CREATE TABLE IF NOT EXISTS transactions (
        tx_hash TEXT PRIMARY KEY,
        wallet_address TEXT,
        network TEXT,
        type TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
