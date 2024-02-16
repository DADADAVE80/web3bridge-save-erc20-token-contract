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

        it("Should be approved to deposit", async  () => {
            const {owner, erc20Token, saveERC20} = await loadFixture(deploySaveERC20);

            await erc20Token.approve(saveERC20.target, 2000);
            const allowance = await erc20Token.allowance(owner.address, saveERC20.target);

            assert.isNotNull(allowance.toString());
            console.log(allowance);
        });

        it("Should not be able to deposit zero tokens", async () => {
            const {saveERC20} = await loadFixture(deploySaveERC20);

            // const zeroDeposit = await saveERC20.deposit(0);

            expect(saveERC20.deposit(0)).to.be.revertedWith("can't save zero value");
        });

        it("Should not deposit from address zero", async () => {
            const {owner, erc20Token, saveERC20, zeroAddress} = await loadFixture(deploySaveERC20);

            expect(owner).is.not.equal(zeroAddress);
        });
    });
});