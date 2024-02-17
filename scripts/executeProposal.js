const { ethers } = require("hardhat");
const { tokenAddress, governorAddress } = require("./constants");

const executeProposal = async () => {
  const governor = await ethers.getContractAt("MyGovernor", governorAddress);
  const token = await ethers.getContractAt("MyToken", tokenAddress);
  const owner = await ethers.provider.getSigner(0);
  const ownerAddress = await owner.getAddress();

  const calldata = token.interface.encodeFunctionData("mint", [
    ownerAddress,
    ethers.utils.parseEther("25000"),
  ]);

  const transaction = await governor.execute(
    [tokenAddress],
    [0],
    [calldata],
    ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(
        "Mint an additional 25000 tokens to provide more voting power to owner"
      )
    )
  );

  const receipt = await transaction.wait();
  console.log("Receipt: ", receipt);
  console.log("Success: 25000 new tokens minted to" + ownerAddress);
  
};

executeProposal();
