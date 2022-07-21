import { RandomUUIDOptions } from "crypto";
import uuid from "uuid";
import { SubType } from "./SubType";
import { TeaType } from "./TeaType";
import { UUID } from "./UUID";

export class Tea{
    readonly id: UUID;
    readonly name: string;
    readonly type: TeaType;
    readonly subTypes: SubType[];
    readonly currentPrice: number;
    readonly amount: number;
    readonly link: string;
    readonly vendor: string;
    readonly year: number;

    constructor(id: UUID, name: string, type: TeaType, subTypes: SubType[], currentPrice: number, amount: number, link: string, vendor: string, year: number){
        this.id = id;
        this.name = name;
        this.type = type;
        this.subTypes = subTypes;
        this.currentPrice = currentPrice;
        this.amount = amount;
        this.link = link;
        this.vendor = vendor;
        this.year = year;
    }

 

}