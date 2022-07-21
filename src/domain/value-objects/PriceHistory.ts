import { PriceAtDate } from "./PriceAtDate";
import { Tea } from "../Tea";

export class PriceHistory {
    readonly tea: Tea;
    readonly prices: PriceAtDate[];

    constructor(tea: Tea, prices: PriceAtDate[]) {
        this.tea = tea;
        this.prices = prices;
    }
}