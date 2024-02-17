const { ethers } = require("hardhat");
const { tokenAddress } = require("./constants");

// Delegate the voting power to yourself to enable participation
const delegateVotes = async () => {
    const token = await ethers.getContractAt("MyToken", tokenAddress);
    const owner = await ethers.provider.getSigner(0);
    const ownerAddress = await owner.getAddress();
    await token.delegate(ownerAddress);

    const balance = await token.balanceOf(ownerAddress);
    console.log("Token Balance: ", + ethers.utils.formatEther(balance));
};

delegateVotes();