import { SafeUrl } from "@angular/platform-browser";
import { TripImage } from "./TripImage";

export class Trip{

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public imagePath: SafeUrl,
        public tripImageId: string,
        public tripImage: TripImage,
        public distance?: number,
        public duration?: number
    ){}
}