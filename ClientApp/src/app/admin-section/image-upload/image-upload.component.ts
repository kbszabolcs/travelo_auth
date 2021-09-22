import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/data/models/Trip';
import { TripService } from 'src/app/services/trip-service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  private imageForm: FormGroup;
  private _formSubmitted: boolean = false;
  private base64Image: string;
  
  @Input() trip$: Observable<Trip>;
  @Input() set formSubmitted(submitted: boolean) {
    if (submitted) {
      this.imageForm.reset();
      this.base64Image = "";
    }
    this._formSubmitted = submitted;
  }
  get formSubmitted(): boolean{
    return this._formSubmitted;
  }
  @Output() uploadedImageFile = new EventEmitter<File>();
  @Output() uploadedImageBase64 = new EventEmitter<string>();

  constructor(public fb: FormBuilder) {
    this.imageForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }

  ngOnInit(): void {
    if (this.trip$) {
      this.trip$.subscribe(
        result => {
          this.base64Image = TripService.base64Prefix + result.tripImage.image;
          //console.log("image-upload base64image was set to: " + this.base64Image);
        }
      )
    }
  }

  imagePreview(e) {
    //console.log("imagePreview was called");
    

    const file = (e.target as HTMLInputElement).files[0];

    this.imageForm.patchValue({
      img: file
    });

    this.imageForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;
      //console.log("Readers result: " + reader.result as string);
      
      this.uploadedImageFile.emit(this.imageForm.value.img)
      this.uploadedImageBase64.emit(this.base64Image)
    }
    reader.readAsDataURL(file)
  }
}
