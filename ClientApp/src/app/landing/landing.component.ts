import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
  }

}
