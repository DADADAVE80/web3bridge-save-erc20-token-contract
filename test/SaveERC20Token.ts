import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {ethers} from "hardhat";
import {expect, assert} from "chai";


describe("SaveERC20 contract", () => {
    const deploySaveERC20 = async () => {
        // Accounts
        const [owner, otherAccount] = await ethers.getSigners();

        // Zero address
        const zeroAddress = ethers.ZeroAddress;

        // ERC20 Token
        const ERC20Token = await ethers.getContractFactory("TSToken");
        const erc20Token = await ERC20Token.deploy();

        // ERC20 saving contract
        const SaveERC20 = await ethers.getContractFactory("SaveERC20");
        const saveERC20 = await SaveERC20.deploy(erc20Token.target);

        return {saveERC20, owner, otherAccount, zeroAddress, erc20Token};
    }

    describe("Deployment test", async () => {
        it("Should be deployed", async () => {
            const {saveERC20} = await loadFixture(deploySaveERC20);

            assert.isNotNull(saveERC20);
        });
    });

    describe("Deposit test", async () => {
        it("Should have ERC20 Tokens", async () => {
            const {owner, erc20Token, saveERC20} = await loadFixture(deploySaveERC20);

            await erc20Token.balanceOf(owner.address);
            await erc20Token.approve(saveERC20.target, 2000);

            await saveERC20.deposit(1000);

            const bal = await saveERC20.checkUserBalance(owner)


            console.log(bal);
        });

        it("Should not be able to deposit zero tokens", async () => {
            const {owner, erc20Token, saveERC20} = await loadFixture(deploySaveERC20);
        });
    });
});