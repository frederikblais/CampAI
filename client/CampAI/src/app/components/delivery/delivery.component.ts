import { Component, OnInit } from '@angular/core';
import {
  DeliveryService,
  deliveryStatus,
} from 'src/app/services/delivery.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  deliveriesArray: any[] = [];
  myTextInput: string = '';

  constructor(
    private deliveryService: DeliveryService,
    private websocketService: WebsocketService
    ) {}

  ngOnInit(): void {
    this.deliveryService.deliveries.subscribe((deliveries) => {
      this.deliveriesArray = deliveries;
    })

    this.websocketService.openWebSocket();
  }

  onClickAddNewDelivery() {
    console.log(this.myTextInput);
    this.websocketService.sendMessage(this.myTextInput);
    this.deliveryService.addNewDelivery();
  }

  valueOf(status: deliveryStatus) {
    if (status === deliveryStatus.placed) {
      return 33;
    } else if (status === deliveryStatus.transit) {
      return 66;
    }
    return 100;
  }
}
