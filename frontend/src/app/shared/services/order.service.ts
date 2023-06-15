import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {DefaultResponseType} from "../../../types/default-response.type";
import {OrderTypeType} from "../../../types/orderType.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  count: number = 0;
  count$: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) { }

  creatOrder(params: OrderTypeType): Observable<OrderTypeType | DefaultResponseType> {
    return this.http.post<OrderTypeType | DefaultResponseType>(environment.api + 'orders', params, {withCredentials:true})
  };

  getOrders(): Observable<OrderTypeType[] | DefaultResponseType> {
    return this.http.get<OrderTypeType[] | DefaultResponseType>(environment.api + 'orders')
  };

}
