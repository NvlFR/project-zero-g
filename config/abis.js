// config/abis.js
module.exports = {
  // ABI Standar WETH (Kamus untuk Wrap/Unwrap)
  WETH_ABI: [
    "function deposit() public payable",
    "function withdraw(uint wad) public",
    "function balanceOf(address owner) view returns (uint)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
  ],
};
