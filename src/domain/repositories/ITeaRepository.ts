import { PrismaPromise, Tea } from "@prisma/client";

export interface ITeaRepository {
    viewAllTeas:() => Promise<Tea[]>;
}