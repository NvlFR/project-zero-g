const chalk = require("chalk");

// Fungsi delay acak (biar gak dikira robot)
const getRandomDelay = (minSeconds, maxSeconds) => {
  return (
    Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds) *
    1000
  );
};

// Fungsi nominal acak
const getRandomAmount = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(5); // Ambil 5 angka belakang koma
};

module.exports = { getRandomDelay, getRandomAmount };
