import 'regenerator-runtime/runtime'
import "./index.scss";
const server = "http://localhost:3042";
const axios = require('axios');
const { ethers, Wallet, utils } = require("ethers");
const url = "https://mainnet.infura.io/v3/01a35c33613c4f808d90ef6c0c17cb96";
const provider = new ethers.providers.JsonRpcProvider(url);


async function blockNumber() {
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
}

blockNumber().then(function(number){
  for (let i = 0; i < 20; i++){
    provider.getBlock(number - i).then(function (block){
      printBlock(block);
    });
  }
});
function printBlock(block){
  const table = document.getElementById('blocks');
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  cell1.innerHTML = block.number;
  cell2.innerHTML = block.hash;
  cell3.innerHTML = new Date(block.timestamp * 1000);
  cell4.innerHTML = block.miner;
  cell5.innerHTML = block.gasUsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = blockNumber;
