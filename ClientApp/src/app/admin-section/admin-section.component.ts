import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from '../data/models/Trip';
import { TripService } from '../services/trip-service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit{

  private trips: Subject<Trip[]> = new Subject<Trip[]>();
  private currentTrips: Trip[];
  private displayedColumns: string[] = ["Id", "Name", "Price"];

  private clickedTrip$: Subject<Object> = new Subject<Object>();
  private clickedTrip: Trip;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.GetRecommendedTrips().subscribe(
      result => { this.trips.next(result); }
    );

    this.trips.subscribe(
      result => { this.currentTrips = result; }
    )

    this.clickedTrip$.subscribe(
      result => {
        this.clickedTrip = new Trip(
          result["id"],
          result["name"],
          result["description"],
          result["price"],
          result["imagePath"],
          result["tripImageId"],
          result["tripImage"],
          result["distance"],
          result["duration"]
        );
      }
    );
  }

  onRowClicked(trip: Trip) {
    this.clickedTrip$.next(trip);
  }

  onDelete(guid: string) {
    this.tripService.DeleteTrip(guid).subscribe(
      result => {
        this.trips.next(this.currentTrips.filter(trip => trip.id != guid));
        
      },
        error => { console.log(error);
      }
    )
  }
}
