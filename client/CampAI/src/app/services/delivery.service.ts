import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export enum deliveryStatus {
  placed = 'PLACED',
  transit = 'IN_TRANSIT',
  delivered = 'DELIVERED',
}

export interface iDelivery {
  number: number;
  status: deliveryStatus;
  eta: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  deliveries: BehaviorSubject<iDelivery[]> = new BehaviorSubject(
    [] as iDelivery[]
  );

  constructor() {}

  addNewDelivery() {
    const newDel = this.generateNewDelivery();
    this.deliveries.pipe(take(1)).subscribe((allDeliveries) => {
      allDeliveries.push(newDel);
      this.deliveries.next(allDeliveries);
    });
  }

  generateNewDelivery() {
    const currentTime = new Date().getTime();
    const deliveryTime = (60 + Math.floor(Math.random() * 3600 * 2)) * 1000;
    const delivery: iDelivery = {
      number: Math.floor(Math.random() * 1000),
      eta: new Date(currentTime + deliveryTime),
      status: deliveryStatus.placed,
    };
    return delivery;
  }
}
