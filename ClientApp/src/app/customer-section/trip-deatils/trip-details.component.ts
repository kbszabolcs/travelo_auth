import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { OrderCreateDTO } from 'src/app/data/DTO/OrderCreateDTO';
import { Trip } from 'src/app/data/models/Trip';
import { OrderService } from 'src/app/services/order-service';
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
    private authService: AuthorizeService,
    private orderService: OrderService) { }

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
    this.authService.getUserGuid().then(
      userGuid => {
        let orderToPost = new OrderCreateDTO(
          userGuid,
          this.route.snapshot.params['id'],
          new Date()
        )
        return this.orderService.PostOrder(orderToPost).subscribe(
          result => {
            console.log(result);
          }
        )
      }
    )
  }

  public getSantizeUrl(url : string) {
    if(url){
      return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
  }
}
