import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

  private clickedTrip: Subject<Object> = new Subject<Object>();
  private clickedTripName: string = "";

  constructor(private tripService: TripService) {
    this.trips$ = tripService.GetRecommendedTrips();
  }

  ngOnInit(): void {
    this.clickedTrip.subscribe(
      result => { this.clickedTripName = result["name"]; }
    )
  }

  onRowClicked(trip: Trip) {
    this.clickedTrip.next(trip);
  }

  onDelete() {
    
  }
}
