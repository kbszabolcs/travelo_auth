import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Trip } from 'src/app/data/models/Trip';
import { TripService } from 'src/app/services/trip-service';

@Component({
  selector: 'app-trip-deatils',
  templateUrl: './trip-deatils.component.html',
  styleUrls: ['./trip-deatils.component.css']
})
export class TripDeatilsComponent implements OnInit {

  private $trip: Observable<Trip>;
  //private trip: Trip;

  constructor(private route: ActivatedRoute, private tripService: TripService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    var tripId = this.route.snapshot.params['id'];
    this.$trip = this.tripService.GetTripById(tripId).pipe(
      tap(
        trip => {trip.imagePath = "data:image/png;base64," + trip.tripImage.image;}
      )
    )
  }

  public getSantizeUrl(url : string) {
    if(url){
      return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
  }
}
