import { Tea } from "@prisma/client";

export interface IViewTeaService {
    viewAllTeas: () => Promise<Tea[]>;
}