import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  private base64Image: string;
  private imageForm: FormGroup;

  private _formSubmitted: boolean;

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

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.imageForm.patchValue({
      img: file
    });

    this.imageForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;
      this.uploadedImageFile.emit(this.imageForm.value.img)
      this.uploadedImageBase64.emit(this.base64Image)
    }
    reader.readAsDataURL(file)
  }
}
