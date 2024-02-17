const { ethers } = require("hardhat");
const { governorAddress, proposalId } = require("./constants");

const castVote = async () => {
  const governor = await ethers.getContractAt("MyGovernor", governorAddress);

  // 1 as the second parameter indicates support for the proposal
  const transaction = await governor.castVote(proposalId, 1);

  console.log("transaction: ", transaction);

  const receipt = await transaction.wait();

  console.log("receipt: ", receipt);
};

castVote();
