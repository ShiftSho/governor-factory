const { ethers } = require("hardhat");
const { tokenAddress, governorAddress } = require("./constants");

const createProposal = async () => {
    const governor = await ethers.getContractAt("MyGovernor", governorAddress);
    const token = await ethers.getContractAt("MyToken", tokenAddress);
    const owner = await ethers.provider.getSigner(0);
    const ownerAddress = await owner.getAddress();

    const calldata = token.interface.encodeFunctionData("mint", [
        ownerAddress,
        ethers.utils.parseEther("25000"),
    ]);

    console.log( "calldata: ", calldata, "Address: ", ownerAddress );

    const transaction = await governor.propose(
        [tokenAddress],
        [0],
        [calldata],
        "Mint an additional 25000 tokens to provide more voting power to owner",
    );

    const receipt = await transaction.wait();
    const event = receipt.events.find(x => x.event === 'ProposalCreated');
    const { proposalId } = event.args;
    
    console.log( "proposalId: ", proposalId);
}

createProposal();
