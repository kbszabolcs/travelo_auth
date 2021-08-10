import { Component, OnInit } from '@angular/core';
import { AdvantageCard } from '../data/models/AdvantageCard';

@Component({
  selector: 'app-advantages-section',
  templateUrl: './advantages-section.component.html',
  styleUrls: ['./advantages-section.component.css']
})
export class AdvantagesSectionComponent implements OnInit {

  private advantageCards: AdvantageCard[] = []

  ngOnInit() {
    this.advantageCards = [
      new AdvantageCard(
        "assets/advantageCards/GetBestPrices.png",
        "Get Best Prices",
        "Pay through our application and save thousands and get amazing rewards "
      ),
      new AdvantageCard(
        "assets/advantageCards/CovidSafe.png",
        "Covid Safe",
        "We have all the curated hotels that have all the precaution for a corvid safe environment"
      ),
      new AdvantageCard(
        "assets/advantageCards/FlexiblePayment.png",
        "Flexbile Payment",
        "Enjoy the flexible payment through our app and get rewards on every payment "
      ),
      new AdvantageCard(
        "assets/advantageCards/Nearby.png",
        "Find The Best Near You",
        "Find the best hotels and places to visit near you in a single click "
      )
    ]
  }

}
