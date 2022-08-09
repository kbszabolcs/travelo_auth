export class OrderCreateDTO{

    constructor(
        public userId: string,
        public tripId: string,
        public date: Date
    ) { }
}