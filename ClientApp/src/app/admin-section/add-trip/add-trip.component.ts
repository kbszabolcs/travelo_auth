import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TripCreateDTO } from 'src/app/data/models/TripCreateDTO';
import { TripImageCreateDTO } from 'src/app/data/models/TripImageCreateDTO';
import { TripService } from 'src/app/services/trip-service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {

  private interval;

  private tripImageFile: File;
  private tripImageBase64: string;
  private submitted: boolean = false;

  constructor(private tripService: TripService) { }

  onImageUpload(imageFile: File) {
    this.tripImageFile = imageFile;
  }

  onImageByteUpload(base64Image: string) {
    this.tripImageBase64 = base64Image;
  }

  onSubmit(form: NgForm) {
    clearInterval(this.interval);

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
        this.interval = setInterval(() => {
          this.submitted = false
        }, 5000);
      }
    )
  }

}
