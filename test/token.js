const {expect} = require("chai");
const { ethers } = require("hardhat");

describe('Token Contract', () => {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

     beforeEach(async () => {
          Token = await ethers.getContractFactory("Token");
          [owner, addr1, addr2,...addrs] = await ethers.getSigners();
          hardhatToken = await Token.deploy();
     })

     describe("Deployment", () => {
          it("should set the right owner",async()=>{
               expect(await hardhatToken.owner()).to.equal(owner.address);
          })

          it("Should assign the total supply of tokens to the owner", async () => {
               const ownerBalance = await hardhatToken.balanceOf(owner.address);
               expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
          })
     })

     describe("Transactions", () => {
          it("should send 10 tokens from owner to address1",async()=>{
               await hardhatToken.connect(owner).transfer(addr1.address,10);
               expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);
          })
          it("should send 5 tokens from address1 to address2",async()=>{
               await hardhatToken.connect(owner).transfer(addr1.address,10);
               await hardhatToken.connect(addr1).transfer(addr2.address,5);
               expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
          })
          it("should fail if not enough tokens",async()=>{
               const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
               await expect(hardhatToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens");
               expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
          })
          it("should update balances after transfers",async()=>{
               const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
               await hardhatToken.connect(owner).transfer(addr1.address,10);
               await hardhatToken.connect(addr1).transfer(addr2.address,5);
               const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
               expect(finalOwnerBalance).to.equal(initialOwnerBalance-10);
          })
     })
})















































































// const {expect} = require("chai");
// const { ethers } = require("hardhat");

// describe("Token Contract",()=>{
//      it("Deployment should assign total supply to owner",async()=>{
//           const [owner]= await ethers.getSigners();///gives the signer object
//           console.log("Signer Object",owner);
//           const Token=await ethers.getContractFactory("Token"); //crates instance of the contract
//           const hardhatToken=await Token.deploy();//deploying the contract
//           const ownerBalance=await hardhatToken.balanceOf(owner.address);//owner balance=10000
//           console.log("Owner Address",owner.address);
//           console.log("Owner Balance",ownerBalance.toString());
//           expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);//Testing
//      })
//      it("Should Transfer token between accounts",async()=>{
//           const [owner,addr1,addr2]= await ethers.getSigners();///gives the signer object
//           const Token=await ethers.getContractFactory("Token"); //crates instance of the contract
//           const hardhatToken=await Token.deploy();//deploying the contract

//           //Transfer 10 tokens from owner to addr1
//           await hardhatToken.connect(owner).transfer(addr1.address,10);
//           expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);
//           const addr1bal=await hardhatToken.balanceOf(addr1.address);
//           console.log("Addr2 Balance",addr1bal.toString());

//           //Transfer 5 tokens from addr1 to addr2
//           await hardhatToken.connect(addr1).transfer(addr2.address,5);
//           expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
//           const addr2bal=await hardhatToken.balanceOf(addr2.address);
//           console.log("Addr2 Balance",addr2bal.toString());

//           const ownerBal=await hardhatToken.balanceOf(owner.address);
//           console.log("Owner Balance",ownerBal.toString());

//      })
// })