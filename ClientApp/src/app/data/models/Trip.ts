export class Trip{

    constructor(
        public Id: number,
        public Name: string,
        public Description: string,
        public Price: number,
        public ImagePath: string,
        public Distance?: number,
        public Duration?: number
    ){}
}