import { PrismaClient, PrismaPromise, Tea } from "@prisma/client";
import { resolve } from "path";
import { ITeaRepository } from "../domain/repositories/ITeaRepository";
//import { Tea } from "../domain/Tea";

export class TeaRepository implements ITeaRepository {
  prisma = new PrismaClient();

    async viewAllTeas(): Promise<Tea[]> {
        return await this.prisma.tea.findMany();
    }

    async createTea(tea: Tea): Promise<void> {
        const result = await this.prisma.tea.create({
            data: tea
        });
    }
}
