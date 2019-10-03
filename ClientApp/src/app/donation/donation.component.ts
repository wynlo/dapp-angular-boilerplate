import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const donation_artifacts = require('../../../build/contracts/Donation.json');

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  loaded = false;
  accounts: string[];
  donation: any;

  model = {
    transaction: {
      receiver: '',
      amount: 0
    },
    account: {
      address: '',
      isDonor:false,
      balance: 0,
    }
  };

  donorCount = 0;
  status = '';
  receiverAddr = '';
  sendAmt = 0;

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this.model);
    // console.log(this);
    this.watchAccount();
    this.web3Service.artifactsToContract(donation_artifacts)
      .then((DonationAbstraction) => {
        this.donation = DonationAbstraction;
        this.donation.deployed().then(deployed => {

          // console.log(deployed);
          // deployed.Transfer({}, (err, ev) => {
          //   console.log('Transfer event came in, refreshing balance');
          //   this.refreshBalance();
          // });
        });

      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account.address = accounts[0];
      console.log("Account: ",accounts[0])
      this.refreshBalance();
      this.refreshDonor();
      this.getDonorCount();
      //=====================>>
      this.loaded = true;
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }


  async registerDonor(newAddress) {

    if (!this.donation) {
      this.setStatus("Contract is not loaded!");
      return;
    }

    try {
      const deployedDonation = await this.donation.deployed();
      const reg = await deployedDonation.register.sendTransaction(this.model.account.address,{from: this.model.account.address});

      console.log("register success: ",reg);
      if (!reg || reg == false) {
        this.setStatus('Registration failed!');
      } else {
        this.setStatus('Registration complete!');
      }

      this.refreshDonor();

    } catch (e) {
      console.log(e);
      this.setStatus('Error; see log.');
    }
  }


  async refreshDonor() {
    try {
      const deployedDonation = await this.donation.deployed();
      var scope = this;
      await deployedDonation.getDonor.call(this.model.account.address,function(err, res){
        if (res == true) {
          scope.model.account.isDonor = true;
        } else {
          scope.model.account.isDonor = false;
        }
      });
      console.log("isDonor: ",scope.model.account.isDonor);

    } catch (e) {
      console.log(e);
      // alert('Error getting balance; see log.');
      this.setStatus('Error; see log.');
    }
  }



  async getDonorCount() {
    try {
      const deployedDonation = await this.donation.deployed();
      var scope = this;
      await deployedDonation.getDonorCount.call(function(err, res){
        if (res) {
            console.log(res);
            scope.donorCount = res;
        }
      });
      console.log("donorCount: ",scope.donorCount);

    } catch (e) {
      console.log(e);
      // alert('Error getting balance; see log.');
      this.setStatus('Error; see log.');
    }
  }

  async sendToken() {
    console.log(this.receiverAddr);
    console.log(this.sendAmt);
    if (this.sendAmt > 0 || this.receiverAddr != '') {

      if (!this.donation) {
        this.setStatus('Metacoin is not loaded, unable to send transaction');
        return;
      }

      const amount = this.sendAmt;
      const receiver = this.receiverAddr;

      console.log('Sending coins' + amount + ' to ' + receiver);

      this.setStatus('Initiating transaction... (please wait)');
      try {
        const deployedContract = await this.donation.deployed();
        const transaction = await deployedContract.donate.sendTransaction(
          receiver,
          amount,
          {from: this.model.account.address});

        if (!transaction) {
          this.setStatus('Transaction failed!');
        } else {
          this.setStatus('Transaction complete!');
        }
      } catch (e) {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      }



    } else {
      this.setStatus('Fill in properly leh');
    }
  }


  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedContract = await this.donation.deployed();
      console.log(deployedContract);
      console.log('Account', this.model.account.address);
      const balance = await deployedContract.getBalance.call(this.model.account.address);
      console.log('Found balance: ' + balance);
      this.model.account.balance = balance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }


  // FOR GETTNG ETHEREUM BALANCE
  //===============================================================

  // async refreshBalance() {
  //   // console.log('Refreshing balance');
  //
  //   try {
  //     console.log(this.model.account.address);
  //     const deployedDonation = await this.donation.deployed();
  //     // console.log(deployedDonation);
  //     // console.log('Account', this.model.account);
  //     const balance = await this.web3Service.getBalance(this.model.account.address)/(10**18);
  //     console.log('Found balance: ' + balance);
  //     this.model.account.balance = balance;
  //   } catch (e) {
  //     console.log(e);
  //     // alert('Error getting balance; see log.');
  //     this.setStatus('Error getting balance; see log.');
  //   }
  // }

}
