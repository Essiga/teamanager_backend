import {PrismaClient, Tea} from "@prisma/client";
import {ITeaRepository} from "../domain/repositories/ITeaRepository";

export class TeaRepository implements ITeaRepository {
    private prisma = new PrismaClient();

    async addTea(tea: Tea): Promise<void> {
        try {
            await this.prisma.tea.create({
                data: tea,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async viewAllTeas(): Promise<Tea[]> {
        return await this.prisma.tea.findMany();
    }

    async updateTea(tea: Tea): Promise<void>{
        try {
            await this.prisma.tea.updateMany({
                where: {
                    id: {
                        contains: tea.id,
                    },
                },
                data: tea,
        });
        } catch (error){
            console.log(error);
        }
    }
}
