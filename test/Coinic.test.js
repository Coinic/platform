const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const BN = require("bn.js");

chai.use(require("chai-bn")(BN));
chai.use(chaiAsPromised);
const expect = chai.expect;

const Coinic = artifacts.require("Coinic");

contract("Coinic", async (accounts) => {
  const owner = accounts[0];
  const alice = accounts[1];
  const bob = accounts[2];

  it("should put 1,000,000 Coinic in the owner account", async () => {
    const instance = await Coinic.deployed();
    const balance = await instance.balanceOf.call(owner);
    expect(balance).to.be.a.bignumber.that.is.equal("1000000");
    expect(await instance.symbol()).to.be.equal("COINIC");
  });

  it("should mint only by owner", async () => {
    const instance = await Coinic.deployed();
    expect(instance.mint(bob, 1000, { from: bob })).to.eventually.be.rejected;
    await instance.mint(bob, 1000);
    const balance = await instance.balanceOf.call(bob);
    const total = await instance.totalSupply();
    expect(balance).to.be.a.bignumber.that.is.equal("1000");
    expect(total).to.be.a.bignumber.that.is.equal("1001000");
  });

  // xit("should send coin correctly", async () => {
  //   // Get initial balances of first and second account.
  //   let account_one = accounts[0];
  //   let account_two = accounts[1];

  //   let amount = 10;

  //   let instance = await MetaCoin.deployed();
  //   let meta = instance;

  //   let balance = await meta.getBalance.call(account_one);
  //   let account_one_starting_balance = balance.toNumber();

  //   balance = await meta.getBalance.call(account_two);
  //   let account_two_starting_balance = balance.toNumber();
  //   await meta.sendCoin(account_two, amount, { from: account_one });

  //   balance = await meta.getBalance.call(account_one);
  //   let account_one_ending_balance = balance.toNumber();

  //   balance = await meta.getBalance.call(account_two);
  //   let account_two_ending_balance = balance.toNumber();

  //   assert.equal(
  //     account_one_ending_balance,
  //     account_one_starting_balance - amount,
  //     "Amount wasn't correctly taken from the sender"
  //   );
  //   assert.equal(
  //     account_two_ending_balance,
  //     account_two_starting_balance + amount,
  //     "Amount wasn't correctly sent to the receiver"
  //   );
  // });
});
