import {Tea} from "@prisma/client";
import {Decimal} from "@prisma/client/runtime";

export interface ITeaRepository {
    viewAllTeas: () => Promise<Tea[]>;
    addTea: (tea: Tea) => Promise<void>;
    updateTea: (updateTea: Tea) => Promise<void>;
    subtractAmount(teaId: string, amount: Decimal): void;
}

