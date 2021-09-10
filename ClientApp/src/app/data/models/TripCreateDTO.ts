import { TripImageCreateDTO } from "./TripImageCreateDTO";

export class TripCreateDTO{

    constructor(
        public name: string,
        public description: string,
        public price: number,
        public imagePath: string,
        public tripImage: TripImageCreateDTO,
        public distance?: number,
        public duration?: number
    ){}
}