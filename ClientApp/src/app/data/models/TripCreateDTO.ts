import { TripImageCreateDTO } from "./TripImageCreateDTO";

export class TripCreateDTO{

    constructor(
        public Name: string,
        public Description: string,
        public Price: number,
        public ImagePath: string,
        public tripImage: TripImageCreateDTO,
        public Distance?: number,
        public Duration?: number
    ){}
}