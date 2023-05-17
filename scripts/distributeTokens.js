// How to run:
// cd scripts/
// node distributeTokens.js

const { ethers } = require('ethers');
const contractABI = require('../contracts/abi/Lantana.json'); // Replace with the actual contract ABI file

// TODO: Use .env file to store the private key
const privateKey = ''; // Replace with your actual privateKey
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/'); // Polygon Mumbai RPC endpoint
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0x848a86624da050e82dd6cbc38860e9332bbfee81'; // Replace with your actual contract address
const tokenContract = new ethers.Contract(contractAddress, contractABI, wallet);

const addresses = [
  '0xAddress1',
  '0xAddress2',
  // Add more addresses as needed
];
const tokenAmounts = [
  '10', // Amount for Address1
  '10', // Amount for Address2
  // Add more amounts corresponding to the addresses above
];

async function distributeTokens() {
  const senderAddress = await wallet.getAddress();
  const senderBalance = await tokenContract.balanceOf(senderAddress);
  const senderBalanceTokens = ethers.utils.formatEther(senderBalance);
  console.log(`Sender balance: ${senderBalanceTokens} TOKEN`);
  
  for (let i = 0; i < addresses.length; i++) {
    const recipientAddress = addresses[i];
    const amount = tokenAmounts[i];
    const amountToSend = ethers.BigNumber.from(tokenAmounts[i]).mul(ethers.constants.WeiPerEther);
    
    console.log(`Sending ${amount} tokens to ${recipientAddress}`);
    
    try {
      const transaction = await tokenContract.transfer(recipientAddress, amountToSend);
      await transaction.wait();
      console.log(`Tokens sent successfully to ${recipientAddress}`);
    } catch (error) {
      console.error(`Failed to send tokens to ${recipientAddress}: ${error}`);
    }
  }
}

distributeTokens()
  .then(() => {
    console.log('Token distribution completed.');
  })
  .catch((error) => {
    console.error(`Token distribution failed: ${error}`);
  });
