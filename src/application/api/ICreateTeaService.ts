import { Tea } from "@prisma/client";

export interface ICreateTeaService {
    createTea: (tea: Tea) => Promise<void>;
}