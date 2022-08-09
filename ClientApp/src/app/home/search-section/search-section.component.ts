import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/data/models/Trip';
import { TripService } from 'src/app/services/trip-service';

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

  private trips$: Observable<Trip[]>;

  constructor(private recommendedService: TripService){}

  ngOnInit() {
    this.trips$ = this.recommendedService.GetRecommendedTrips();
  }
  
  private listSearchResult(){
    console.log(this.checkInDate);
    console.log(this.checkOutDate);
    console.log(this.tripLocations.value);
    
  }

  private checkInValidation = (d: Date | null): boolean => {
    return this.checkOutDate == null ? true : d < this.checkOutDate;
  };
  
  private checkOutValidation = (d: Date | null): boolean => {
    return this.checkInDate < d;
  };
  
}
