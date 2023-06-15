import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {OrderTypeType} from "../../../../types/orderType.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {OrderStatusUtils} from "../../../shared/utils/order-status.utils";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  orders: OrderTypeType[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getOrders()
      .subscribe((data: OrderTypeType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) { //проверка и генерирование ошибки если она пришла.
          throw new Error((data as DefaultResponseType).message)
        }
        this.orders = (data as OrderTypeType[]).map(item => {
         const status = OrderStatusUtils.getStatusAndColor(item.status)

          item.statusRus = status.name;
          item.color = status.color;
          return item
        });
      })
  }

}
