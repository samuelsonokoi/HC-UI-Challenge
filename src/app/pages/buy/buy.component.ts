import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { IOrder } from '../../models/order.model';

@Component({
  selector: 'app-buy',
  imports: [ReactiveFormsModule, NgIf, NgFor, DecimalPipe],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit, OnDestroy {
  buyForm = new FormGroup({
    amountToPay: new FormControl(100, [Validators.required, Validators.min(100)]),
    accountName: new FormControl('Dominic Mulinda', [Validators.required]),
    phoneNumber: new FormControl('713210124', [Validators.required]),
    emailAddress: new FormControl('dominic@honeycoin.app', [Validators.required, Validators.email]),
  });
  currentStep = 1;
  amountToReceive = 0;
  kenyanRate!: number;
  subscription = new Subscription();
  apiService = inject(ApiService);

  ngOnInit(): void {
    this.subscription = this.apiService.getExchangeRates().subscribe({ next: rate => {
      this.kenyanRate = rate.KES;
      this.amountToReceive = 100 * this.kenyanRate;
    }});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(){
    if (this.buyForm.valid) {
      const { amountToPay, accountName, phoneNumber, emailAddress } = this.buyForm.value;
      const order: IOrder = {
        amountToPay: amountToPay!,
        accountName: accountName!,
        phoneNumber: phoneNumber!,
        emailAddress: emailAddress!
      }
      this.subscription = this.apiService.processOrder(order).subscribe({
        next: (payload) => console.log(payload),
        error: (error) => console.log(error)
      })
    }
  }

  calculateAmountToReceive = (event: Event | any) => this.amountToReceive = parseInt(event.target.value) * this.kenyanRate;

  moveForward = () => this.currentStep = this.currentStep < 6 ? this.currentStep + 1 : this.currentStep

  moveBackward = () => this.currentStep = this.currentStep > 1 ? this.currentStep - 1 : this.currentStep
}
