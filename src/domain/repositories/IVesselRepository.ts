import { Vessel } from "@prisma/client";

export interface IVesselRepository {
    addVessel:(vessel: Vessel) => Promise<void>;
    viewAllVessels:() => Promise<Vessel[]>;
}