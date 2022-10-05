import {Tea} from "@prisma/client";

export interface ITeaService {
    addTea: (tea: Tea) => Promise<void>;
    viewAllTeas: () => Promise<Tea[]>;
}
