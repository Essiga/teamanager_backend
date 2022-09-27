import { PriceAtDate } from "./value-objects/PriceAtDate";
import { SubType } from "./value-objects/SubType";
import { TeaType } from "./value-objects/TeaType";
import { UUID } from "./value-objects/UUID";

export class Tea{
    readonly id: string;
    readonly name: string;
    readonly type: TeaType;
    readonly subTypes: SubType[];
    readonly amount: number;
    readonly link: string;
    readonly vendor: string;
    readonly year: number;
    readonly priceHistory: PriceAtDate[];

    constructor(id: string, name: string, type: TeaType, subTypes: SubType[], amount: number, link: string, vendor: string, year: number, priceHistory: PriceAtDate[]){
        this.id = id;
        this.name = name;
        this.type = type;
        this.subTypes = subTypes;
        this.amount = amount;
        this.link = link;
        this.vendor = vendor;
        this.year = year;
        this.priceHistory = priceHistory;
    }

 

}