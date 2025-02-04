import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getExchangeRates = () => of({ KES: 128.152 })

  validateWalletAddress = (address: string) => of({ valid: /^0x[a-fA-F0-9]{40}$/.test(address) });

  processOrder = (order: IOrder) => of({ success: true, orderId: '123', order });
}
