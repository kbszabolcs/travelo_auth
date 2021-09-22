import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class EditTripComponent implements OnInit, OnDestroy {

  private interval;

  private trip$: Observable<Trip>;
  private tripId: string;

  private tripImageFile: File;
  private tripImageBase64: string;
  private tripImageBase64Name: string;
  private submitted: boolean = false;


  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['id'];
    this.trip$ = this.tripService.GetTripById(this.tripId);
    this.trip$.subscribe(
      result => {
        this.tripImageBase64 = TripService.base64Prefix + result.tripImage.image
        this.tripImageBase64Name = result.tripImage.name;
      }
    )
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onImageUpload(imageFile: File) {
    this.tripImageFile = imageFile;
  }

  onImageByteUpload(base64Image: string) {
    this.tripImageBase64 = base64Image;
  }

  onSubmit(form: NgForm) {

    var tripImageCreateDTO = new TripImageCreateDTO(
      this.tripImageFile ? this.tripImageFile.name.substring(0, this.tripImageFile.name.indexOf('.')) : this.tripImageBase64Name,
      this.tripImageBase64.slice(this.tripImageBase64.lastIndexOf(',')+1)
    )

    var tripToUpdate = new TripCreateDTO(
      form.value["tripName"],
      form.value["tripDescription"],
      form.value["tripPrice"],
      "ImagePath",
      tripImageCreateDTO,
      form.value["tripDistance"],
      form.value["tripDuration"]
    )

    console.log(tripToUpdate);
    

    this.tripService.UpdateTrip(this.tripId ,tripToUpdate).subscribe(
      result => {
        this.submitted = true;
        console.log("update trip anyaaad ");
        
        this.interval = setInterval(() => {
          console.log("interval asdasd");
          
          this.submitted = false;
          this.router.navigate(['/admin'])
          
        }, 2000);
      }
    )
  }

}
