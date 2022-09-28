import { PrismaClient, PrismaPromise, Tea } from "@prisma/client";
import { resolve } from "path";
import { ITeaRepository } from "../domain/repositories/ITeaRepository";
//import { Tea } from "../domain/Tea";

export class TeaRepository implements ITeaRepository {
  prisma = new PrismaClient();

    async viewAllTeas(): Promise<Tea[]> {
        const teas = await this.prisma.tea.findMany();
        return teas;
    }
}
