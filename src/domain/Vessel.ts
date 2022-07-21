import { UUID } from "./UUID";

export class Vessel {
    readonly id: UUID;
    readonly name: string;
    readonly capacity: number;

    constructor(id: UUID, name: string, capacity: number) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
    }
}