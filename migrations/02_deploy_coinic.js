const Coinic = artifacts.require("Coinic");

module.exports = function (deployer) {
  deployer.deploy(Coinic);
};
