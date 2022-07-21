export class PriceAtDate {
    readonly date: Date;
    readonly price: number;

    constructor(date: Date, price: number) {
        this.date = date;
        this.price = price;
    }
}