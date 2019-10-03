pragma solidity ^0.5.0;
import "./SafeMath.sol";

contract Donation {


	struct transaction {
        address receiver;
        uint256 amount;
	}

    mapping (address => uint256) public balances;
	mapping (address => bool) public donors;
	uint256 public donorCount;
	mapping (address => transaction) public transactions;


	event Register(address indexed _newAdd);
	event Donate(address indexed _from, address indexed _to, uint256 _value);

	constructor() public {
		donorCount = 0;
		balances[tx.origin] = 10000; //Initalize first account to have 10000 token
	}


	function register(address add) public returns (bool) {

	    if (donors[add] == true) {
	        return false;
	    }

	    donors[add] = true;
			donorCount = donorCount + 1;
	    emit Register(add);

      return true;

	}


	function donate(address payable receiver, uint amount) public payable returns (bool) {

		if (balances[msg.sender] < amount) return false; //check if sender balance has sufficient
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Donate(msg.sender, receiver, amount);

	   return true;

	}


    function getBalance(address add) public view returns (uint256) {
        return balances[add];
    }

    function getDonor(address add) public view returns (bool) {
      	if (donors[add] == false) {
					return false;
				} else {
					return true;
				}
    }

		function getDonorCount() public view returns (uint256) {
			return donorCount;
		}

}
