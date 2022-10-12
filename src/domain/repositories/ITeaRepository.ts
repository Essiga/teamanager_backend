import {Tea} from "@prisma/client";

export interface ITeaRepository {
    viewAllTeas: () => Promise<Tea[]>;
    addTea: (tea: Tea) => Promise<void>;

    subtractAmount(teaId: string, amount: Decimal): void;
    updateTea: (editTea: Tea) => Promise<void>;
}
