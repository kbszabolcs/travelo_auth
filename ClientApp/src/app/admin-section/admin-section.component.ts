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

  private _trips$: Observable<Trip[]>;
  private trips: Trip[];
  private _tripsService: TripService;
  private _displayedColumns: string[] = ["Id", "Name", "Price"];

  constructor(private tripService: TripService) {
    this._tripsService = tripService;
    this._trips$ = this._tripsService.GetRecommendedTrips();
  }

  ngOnInit(): void {
    
  }
}
