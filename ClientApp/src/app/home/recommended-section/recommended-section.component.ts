import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecommendationLink } from '../../data/models/RecommendationLink';
import { Trip } from '../../data/models/Trip';
import { RecommendedService } from '../../services/recommended-service';

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

  constructor(private recommendedService: RecommendedService) {}

  ngOnInit() {
    // Call service for the data
    this.trips$ = this.recommendedService.GetRecommendedTrips()
  }

  private changeRecommendations(link: RecommendationLink) {
    // Change the active recommendation headlink
    this.activeLink = this.links.find(
      l => l.Id === link.Id
    )
  }

}
