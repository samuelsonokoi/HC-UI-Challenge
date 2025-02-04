import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getExchangeRates = () => of({ USDT: 1, KES: 128.152 })

  validateWalletAddress = (address: string) => of({ valid: /^0x[a-fA-F0-9]{40}$/.test(address) });

  processOrder = (order: any) => of({ success: true, orderId: '12345' });
}
