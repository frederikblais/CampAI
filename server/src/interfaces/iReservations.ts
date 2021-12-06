export type iReservations = {
    name: string;
    dateIn: Date;
    dateOut: Date;
    peopleCount: number;
    lot: number;
}

export class Reservations implements iReservations {
    name: string;
    dateIn: Date;
    dateOut: Date;
    peopleCount: number;
    lot: number;

    constructor(args) {
        this.name = args.name;
        this.dateIn = args.dateIn;
        this.dateOut = args.dateOut;
        this.peopleCount = args.peopleCount;
        this.lot = args.lot;
    }
}