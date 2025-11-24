module.exports = {
  // Target Utama: Berachain bArtio Testnet
  berachain: {
    name: "Berachain bArtio",
    rpcUrl: "https://bartio.rpc.berachain.com/",
    chainId: 80084,
    currencySymbol: "BERA",
    explorer: "https://bartio.beratrail.io/",
    contracts: {
      // Address WBERA (Wrapped BERA) di bArtio
      weth: "0x7507c1dc16935B82698e4C1388705db805b97430",
    },
  },
  sepolia: {
    name: "Sepolia Testnet",
    // Kita ganti pakai RPC PublicNode yang lebih stabil
    rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    chainId: 11155111,
    currencySymbol: "ETH",
    explorer: "https://sepolia.etherscan.io/",
    contracts: {
      weth: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    },
  },
};
