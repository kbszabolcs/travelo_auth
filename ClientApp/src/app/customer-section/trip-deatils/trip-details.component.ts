import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Trip } from 'src/app/data/models/Trip';
import { TripService } from 'src/app/services/trip-service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  private $trip: Observable<Trip>;
  private $isAuthenticated: Observable<boolean>;

  constructor(
    private route: ActivatedRoute, 
    private tripService: TripService, 
    private domSanitizer: DomSanitizer,
    private authService: AuthorizeService) { }

  ngOnInit() {
    var tripId = this.route.snapshot.params['id'];
    this.$trip = this.tripService.GetTripById(tripId).pipe(
      tap(
        trip => {trip.imagePath = "data:image/png;base64," + trip.tripImage.image;}
      )
    )

    this.$isAuthenticated = this.authService.isAuthenticated();
  }

  private onReservation(){
    
  }

  public getSantizeUrl(url : string) {
    if(url){
      return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
  }
}
