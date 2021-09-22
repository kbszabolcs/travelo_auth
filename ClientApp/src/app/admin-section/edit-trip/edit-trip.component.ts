import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/data/models/Trip';
import { TripCreateDTO } from 'src/app/data/models/TripCreateDTO';
import { TripImageCreateDTO } from 'src/app/data/models/TripImageCreateDTO';
import { TripService } from 'src/app/services/trip-service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  private trip$: Observable<Trip>;

  private tripImageFile: File;
  private tripImageBase64: string;
  private submitted: boolean = false;

  constructor(private tripService: TripService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    var tripId = this.route.snapshot.params['id'];
    this.trip$ = this.tripService.GetTripById(tripId);

    this.trip$.subscribe(
      result => { console.log(result); }
    );
  }

  onImageUpload(imageFile: File) {
    this.tripImageFile = imageFile;
  }

  onImageByteUpload(base64Image: string) {
    this.tripImageBase64 = base64Image;
  }

  onSubmit(form: NgForm) {
    var tripToUpload = new TripCreateDTO(
      form.value["tripName"],
      form.value["tripDescription"],
      form.value["tripPrice"],
      "ImagePath",
      new TripImageCreateDTO(
        this.tripImageFile.name.substring(0, this.tripImageFile.name.indexOf('.')),
        this.tripImageBase64.slice(this.tripImageBase64.lastIndexOf(',')+1)
      ),
      form.value["tripDistance"],
      form.value["tripDuration"]
    )

    this.tripService.PostTrip(tripToUpload).subscribe(
      result => {
        form.reset();
        this.submitted = true;
        setInterval(() => this.submitted = false, 5000);
      }
    )
  }

}
