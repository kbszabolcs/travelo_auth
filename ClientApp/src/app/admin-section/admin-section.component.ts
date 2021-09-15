import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  private allTrips: Trip[];
  private filteredTrips: Trip[];
  private displayedColumns: string[] = ["Name", "Id", "Price"];

  private clickedTrip$: Subject<Trip> = new Subject<Trip>();
  private clickedTrip: Trip;

  private searchName: string = "";
  private searchFormControl = new FormControl('', { validators:[Validators.required] });

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.GetRecommendedTrips().subscribe(
      result => { this.trips.next(result); }
    );

    this.trips.subscribe(
      result => {
        this.allTrips = result;
        this.filteredTrips = result;
      }
    )

    this.clickedTrip$.subscribe(
      result => {
        this.clickedTrip = result;
      }
    );
  }

  searchTripsByName(event: any) {
    this.searchName = this.searchName + event.target.value;
    this.filteredTrips = this.allTrips.filter(trip => trip.name.includes(this.searchFormControl.value));
  }

  onRowClicked(trip: Trip) {
    this.clickedTrip$.next(trip);
  }

  onDelete(guid: string) {
    this.tripService.DeleteTrip(guid).subscribe(
      result => {
        this.allTrips = this.allTrips.filter(trip => trip.id != guid);
        this.filteredTrips = this.filteredTrips.filter(trip => trip.id != guid);
      },
        error => { console.log(error);
      }
    )
  }
}
