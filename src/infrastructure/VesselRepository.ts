import {PrismaClient, Vessel} from "@prisma/client";
import {IVesselRepository} from "../domain/repositories/IVesselRepository";

export class VesselRepository implements IVesselRepository {
    private prisma = new PrismaClient();

    async addVessel(vessel: Vessel): Promise<void> {
        try {
            await this.prisma.vessel.create({
                data: vessel
            });
        } catch (error) {
            console.log(error);
        }
    }

    async viewAllVessels(): Promise<Vessel[]> {
        return await this.prisma.vessel.findMany();
    }
}
