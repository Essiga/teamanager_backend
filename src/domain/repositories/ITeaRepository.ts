import { PrismaPromise, Tea } from "@prisma/client";
//import { Tea } from "../Tea";

export interface ITeaRepository{
    viewAllTeas:() => Promise<Tea[]>;
}