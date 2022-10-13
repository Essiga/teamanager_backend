import {Decimal} from "@prisma/client/runtime";

export class SessionDTO{
    readonly id: string;
    readonly teaId: string;
    teaName?: string | null;
    readonly date: Date;
    readonly amount: Decimal;
    readonly price: Decimal | null;
    readonly vesselId: string;


    constructor(id: string, teaId: string, date: Date, amount: Decimal, price: Decimal | null, vesselId: string, teaName?: string) {
        this.id = id;
        this.teaId = teaId;
        this.teaName = teaName || null;
        this.date = date;
        this.amount = amount;
        this.price = price;
        this.vesselId = vesselId;
    }
}