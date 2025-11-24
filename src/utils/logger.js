const winston = require('winston');
const path = require('path');

// Format log custom
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Simpan log error ke file
    new winston.transports.File({ 
        filename: path.join(__dirname, '../../logs/error.log'), 
        level: 'error' 
    }),
    // Simpan semua aktivitas ke file
    new winston.transports.File({ 
        filename: path.join(__dirname, '../../logs/bot_activity.log') 
    }),
    // Tampilkan di terminal juga
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            logFormat
        )
    })
  ],
});

module.exports = logger;