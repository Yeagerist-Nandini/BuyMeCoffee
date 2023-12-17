const {expect} = require("chai");
const { applyErrorMessageTemplate } = require("hardhat/internal/core/errors");


async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.mssg;
    console.log(
      `At ${timestamp},name ${name},address ${from},message ${message}`
    );
  }
}

async function getBalances(address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}

describe("Chai Contract",function(){
  let contract;
  let owner;
  let add1;
  let add2;
  let add3;
  let chai;

  beforeEach(async function(){
    chai=await ethers.getContractFactory("chai");
    [owner,add1,add2,add3]=await ethers.getSigners();
    contract=await chai.deploy();
  });

  describe("Deployment",function(){
    it("Should set the right owner",async function(){
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("Transaction",function(){
    it("Should fail if sender does not have enough ethers",async function(){
      const amount = { value: ethers.parseEther("0") };
      const initialOwnerBalance=await getBalances(owner.address);

      await expect(contract.connect(add1).buyChai("add1","very good course",amount)).to.be.revertedWith("Please pay greater than 0 ether");
      expect(await getBalances(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should transfer ethers between accounts",async function(){
      let initialBalance=await ethers.provider.getBalance(owner.address);
      const amount = { value: ethers.parseEther("1") };

      const val = ethers.parseEther("1");

      await contract.connect(add1).buyChai("add1","Very nice chai", amount);
      expect(await ethers.provider.getBalance(owner.address)).to.equal(initialBalance+val);

      await contract.connect(add2).buyChai("add2","Very nice chai", amount);
      expect(await ethers.provider.getBalance(owner.address)).to.equal(initialBalance+val + val);


      const memos=await contract.getMemos();
      consoleMemos(memos);
  
      console.log("After buying chai:");
      console.log(await getBalances(owner.address),await getBalances(add1.address),await getBalances(add2.address));

    });

  })
})