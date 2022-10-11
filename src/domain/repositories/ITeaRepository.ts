import {Tea} from "@prisma/client";

export interface ITeaRepository {
    viewAllTeas: () => Promise<Tea[]>;
    addTea: (tea: Tea) => Promise<void>;
    updateTea: (editTea: Tea) => Promise<void>;
}
