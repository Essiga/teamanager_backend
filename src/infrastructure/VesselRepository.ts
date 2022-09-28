import { PrismaClient, Vessel } from "@prisma/client";
import { IVesselRepository } from "../domain/repositories/IVesselRepository";

export class VesselRepository implements IVesselRepository{
    private prisma = new PrismaClient();

    async addVessel(vessel: Vessel): Promise<void> {
        await this.prisma.vessel.create({
            data: vessel
        })
    }

    async viewAllVessels(): Promise<Vessel[]> {
        return await this.prisma.vessel.findMany();
    }
}