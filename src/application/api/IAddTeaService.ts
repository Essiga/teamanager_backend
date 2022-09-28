import { Tea } from "@prisma/client";

export interface IAddTeaService {
    addTea: (tea: Tea) => Promise<void>;
}