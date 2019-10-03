import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { first } from "rxjs/operators";

declare let require: any;
// const coin_artifacts = require('../../../../build/contracts/Coin.json');
const donation_artifacts = require('../../../build/contracts/Donation.json');

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  loaded = false;
  accounts: string[];
  // coin: any;
  donation: any;

  // Placeholder data, to be replaced
  model = {
    balance: 0,
    account: ''
  };

  status = '';

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor Run');
  }

  ngOnInit(): void {
    console.log('OnInit Run');
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
      // console.log(this.accounts);
      this.model.account = accounts[0];
      this.refreshBalance();
      // ===================>
      this.loaded = true;
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }


  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedContract = await this.donation.deployed();
      console.log(deployedContract);
      console.log('Account', this.model.account);
      const balance = await deployedContract.getBalance.call(this.model.account);
      console.log('Found balance: ' + balance);
      this.model.balance = balance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  // FOR GETTNG ETHEREUM BALANCE
  //===============================================================

  // async refreshBalance() {
  //   console.log('Refreshing balance');
  //
  //   try {
  //     const deployedDonation = await this.donation.deployed();
  //     // console.log(deployedDonation);
  //     // console.log('Account', this.model.account);
  //     const balance = await this.web3Service.getBalance(this.model.account)/(10**18);
  //     console.log('Found balance: ' + balance);
  //     this.model.balance = balance;
  //     return;
  //   } catch (e) {
  //     console.log(e);
  //     this.setStatus('Error getting balance; see log.');
  //     return;
  //   }
  // }

}
