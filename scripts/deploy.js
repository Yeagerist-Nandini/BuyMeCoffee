const hre = require("hardhat");


async function main() {
  const chai=await ethers.getContractFactory("chai");
  const contract=await chai.deploy();

  console.log("Contract address:",contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


 