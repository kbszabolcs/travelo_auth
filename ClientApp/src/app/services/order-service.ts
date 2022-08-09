import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderCreateDTO } from "../data/DTO/OrderCreateDTO"


@Injectable({ providedIn: 'root' })
export class OrderService {

    private static baseURL: string = 'https://localhost:5001/api/orders/';

    constructor(private http: HttpClient) { }

    public PostOrder(order: OrderCreateDTO): Observable<OrderCreateDTO> {
        return this.http.post<OrderCreateDTO>(
            OrderService.baseURL,
            order
        )
    }

}