export class Order{

    constructor(
        public id: string,
        public userId: string,
        public tripId: string,
        public date: Date
    ) { }
}