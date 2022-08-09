import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/data/models/Trip';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent {

  private checkInDate: Date = null;
  private checkOutDate: Date = null;

  private tripLocations = new FormControl('');
  private tripNames: string[] = [];
  
  private listSearchResult(){
    console.log(this.checkInDate);
    console.log(this.checkOutDate);
    
  }
  
}
