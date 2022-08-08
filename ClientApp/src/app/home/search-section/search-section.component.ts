import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent {

  private checkInDate: Date = null;
  private checkOutDate: Date = null;

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  private listSearchResult(){
    console.log(this.checkInDate);
    console.log(this.checkOutDate);
    
  }
  
}
