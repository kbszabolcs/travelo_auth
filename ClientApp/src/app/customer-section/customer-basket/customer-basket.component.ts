import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client';
import { Observable } from 'rxjs';
import { AuthorizeService, IUser } from 'src/api-authorization/authorize.service';
import { Order } from 'src/app/data/models/Order';

@Component({
  selector: 'app-customer-basket',
  templateUrl: './customer-basket.component.html',
  styleUrls: ['./customer-basket.component.css']
})
export class CustomerBasketComponent implements OnInit {

  private isAuthenticated: boolean;
  private userGuId: string;
  private orders: Order[] = [];

  constructor(private authorizeService: AuthorizeService) { }

  ngOnInit() {
    // Get the users Orders from DB, show them if there's any and the user is logged in
    this.authorizeService.isAuthenticated().subscribe(
      isAuth => {
        if(isAuth){
          console.log('Be vagy jelizve, mutathatod a gombot :)');
        }
      }
    )
    
  }

  public getOrdersOfUser(guid: string) {
    
  }

  public addOrder(order: Order) {
    
  }

  onClick() {
    // Navigate the user to the payment gateway
    console.log('clicked!');
    
  }

}
