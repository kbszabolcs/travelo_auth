import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TripImage } from 'src/app/data/models/TripImage';
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

  constructor(private recommendedService: TripService, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    // Call service for the data
    this.trips$ = this.recommendedService.GetRecommendedTrips().pipe(
      tap(trips => {
        for (var trip of trips) {
          trip.ImagePath = "data:image/png;base64," + trip.tripImage.image;
        }
      }
    ));
  }

  public getSantizeUrl(url : string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  private changeRecommendations(link: RecommendationLink) {
    // Change the active recommendation headlink
    this.activeLink = this.links.find(
      l => l.Id === link.Id
    )
  }

}
