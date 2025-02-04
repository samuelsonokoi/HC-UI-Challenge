import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-buy',
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent {
  buyForm = new FormGroup({

  });
  currentStep = 1;

  onSubmit(){

  }
}
