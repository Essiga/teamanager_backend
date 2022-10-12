import {Tea} from "@prisma/client";
import {Decimal} from "@prisma/client/runtime";

export interface ITeaRepository {
    viewAllTeas: () => Promise<Tea[]>;
    getTeaById:(teaId: string) => Promise<Tea>;
    addTea: (tea: Tea) => Promise<void>;

    subtractAmount(teaId: string, amount: Decimal): void;
}
