import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-buy',
  imports: [ReactiveFormsModule, NgIf, NgFor, DecimalPipe],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit {
  buyForm = new FormGroup({
    amountToPay: new FormControl(100, [Validators.required, Validators.min(100)]),
    accountName: new FormControl('Dominic Mulinda', [Validators.required]),
    phoneNumber: new FormControl('713210124', [Validators.required]),
    emailAddress: new FormControl('dominic@honeycoin.app', [Validators.required, Validators.email]),
  });
  currentStep = 2;
  amountToReceive = 0;
  kenyanRate = 128.152;

  ngOnInit(): void {
    this.amountToReceive = 100 * this.kenyanRate;
  }

  onSubmit(){

  }

  calculateAmountToReceive = (event: Event | any) => this.amountToReceive = parseInt(event.target.value) * this.kenyanRate;

  moveForward = () => this.currentStep = this.currentStep < 6 ? this.currentStep + 1 : this.currentStep

  moveBackward = () => this.currentStep = this.currentStep > 1 ? this.currentStep - 1 : this.currentStep
}
