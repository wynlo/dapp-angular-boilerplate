// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var Coin = artifacts.require("./Coin.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var Donation = artifacts.require("./Donation.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, Coin);
  // deployer.deploy(Coin);
  
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, Donation);
  deployer.deploy(Donation);
};
