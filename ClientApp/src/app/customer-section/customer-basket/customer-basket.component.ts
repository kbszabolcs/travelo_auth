import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-basket',
  templateUrl: './customer-basket.component.html',
  styleUrls: ['./customer-basket.component.css']
})
export class CustomerBasketComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Get the users Orders from DB, show them if there's any and the user is logged in
  }

  onClick() {
    // Navigate the user to the payment gateway
  }

}
