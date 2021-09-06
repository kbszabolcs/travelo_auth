import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TripCreateDTO } from '../data/models/TripCreateDTO';
import { TripService } from '../services/trip-service';
import { TripImageCreateDTO } from '../data/models/TripImageCreateDTO';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent {

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
