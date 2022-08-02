import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecommendationLink } from '../../data/models/RecommendationLink';
import { Trip } from '../../data/models/Trip';
import { TripService } from '../../services/trip-service';

@Component({
  selector: 'app-recommended-section',
  templateUrl: './recommended-section.component.html',
  styleUrls: ['./recommended-section.component.css']
})
export class RecommendedSectionComponent implements OnInit {

  private trips$: Observable<Trip[]>
  private trips: Trip[] = [];

  private links: RecommendationLink[] = [
    new RecommendationLink(
      0,
      'Weekend',
      'The Weekend Break'
    ),
    new RecommendationLink(
      1,
      'Package',
      'The Package Holiday'
    ),
    new RecommendationLink(
      2,
      'Group',
      'The Group Tour'
    ),
    new RecommendationLink(
      3,
      'Long',
      'Long Term Slow Travel'
    )
  ]

  public activeLink: RecommendationLink = this.links.find(
    link => link.Name = "Weekend"
  )

  constructor(private recommendedService: TripService, private router: Router, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    // Call service for the data
    this.trips$ = this.recommendedService.GetRecommendedTrips().pipe(
      tap(trips => {
        for (var trip of trips) {
          trip.imagePath = "data:image/png;base64," + trip.tripImage.image;
        }
      }
    ));

    this.trips$.subscribe(
      argtrips => {
        this.trips = argtrips;
      }
    )
  }

  public getSantizeUrl(url : string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  private onTripImageClick(trip: Trip) {
    this.router.navigate(['trip', trip.id]);
  }

  private changeRecommendations(link: RecommendationLink) {
    // Change the active recommendation headlink
    this.activeLink = this.links.find(
      l => l.Id === link.Id
    )

    // Replaceable logic for selecting trips of rec. headlink
    this.trips = this.shuffle(this.trips);
  }

  private shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

}
