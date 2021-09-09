import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../data/models/Trip';
import { TripService } from '../services/trip-service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit{

  private trips$: Observable<Trip[]>;
  private displayedColumns: string[] = ["Id", "Name", "Price"];

  private clickedTrip: Trip;

  constructor(private tripService: TripService) {
    this.trips$ = tripService.GetRecommendedTrips();
  }

  onRowClicked(trip: Trip) {
    console.log(trip);
    
  }

  ngOnInit(): void {
    
  }
}
