import { PriceAtDate } from "./value-objects/PriceAtDate";
import { SubType } from "./value-objects/SubType";
import { TeaType } from "./value-objects/TeaType";
//import { Tea } from "@prisma/client";
import { UUID } from "./value-objects/UUID";

export class Tea{
    readonly id: string;
    readonly name: string;
    readonly type: TeaType;
    readonly amount: number;
    readonly link: string;
    readonly vendor: string;
    readonly year: number;
    readonly subTypes?: SubType[];
    readonly priceHistory?: PriceAtDate[];

     constructor(id: string, name: string, type: TeaType, amount: number, link: string, vendor: string, year: number, subTypes?: SubType[], priceHistory?: PriceAtDate[]){
         this.id = id;
        this.name = name;
         this.type = type;
        this.amount = amount;
        this.link = link;
         this.vendor = vendor;
         this.year = year;
        this.subTypes = subTypes;
        this.priceHistory = priceHistory;
    }
/* 
    constructor(tea: Tea){
        this.id = tea.id;
        this.name = tea.name;
        this.type = tea.type;
        this.amount = tea.amount;
        this.link = tea.link;
        this.vendor = tea.vendor;
        this.year = tea.year;
        this.subTypes = tea.subTypes;
        this.priceHistory = tea.priceHistory;
    }
  */

}