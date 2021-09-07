import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../data/models/Trip';
import { TripService } from '../services/trip-service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent {

  private trips$: Observable<Trip[]>;
  displayedColumns: string[] = ["Id", "Name", "Price"];

  constructor(private tripService: TripService) {
    this.trips$ = tripService.GetRecommendedTrips();
  }
  
}
