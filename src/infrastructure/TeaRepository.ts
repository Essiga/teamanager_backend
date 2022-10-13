import {PrismaClient, Tea} from "@prisma/client";
import {ITeaRepository} from "../domain/repositories/ITeaRepository";
import {Decimal} from "@prisma/client/runtime";

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

    async subtractAmount(teaId: string, amount: Decimal){
        console.log(amount);
        return await this.prisma.tea.update({
            where: {
                id: teaId
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })
    }

    async viewAllTeas(): Promise<Tea[]> {
        return await this.prisma.tea.findMany();
    }

    async updateTea(tea: Tea): Promise<void>{
        try {
            await this.prisma.tea.update({
                where: {
                    id: tea.id
                },
                data: tea,
        });
        } catch (error){
            console.log(error);
        }
    }

    async getTeaById(teaId: string): Promise<Tea> {
        return await this.prisma.tea.findUnique({where: {id: teaId}})  || {} as Tea;
    }
}
