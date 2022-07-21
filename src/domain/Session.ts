import { Tea } from "./Tea";
import { UUID } from "./value-objects/UUID";
import { Vessel } from "./Vessel";

export class session {
    readonly id: UUID;
    readonly teaId: UUID;
    readonly amount: number;
    readonly date: Date;
    readonly pricePerGram: number; 
    readonly vessel: Vessel;

    constructor(id: UUID, teaId: UUID, amount: number, date: Date, pricePerGram: number, vessel: Vessel) {
        this.id = id;
        this.teaId = teaId;
        this.amount = amount;
        this.date = date;
        this.pricePerGram = pricePerGram;
        this.vessel = vessel;
    }
}