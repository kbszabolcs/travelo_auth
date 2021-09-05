import { SafeUrl } from "@angular/platform-browser";
import { TripImage } from "./TripImage";

export class Trip{

    constructor(
        public Id: string,
        public Name: string,
        public Description: string,
        public Price: number,
        public ImagePath: SafeUrl,
        public TripImageId: string,
        public tripImage: TripImage,
        public Distance?: number,
        public Duration?: number
    ){}
}