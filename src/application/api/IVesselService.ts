import {Vessel} from "@prisma/client";

export interface IVesselService {
    addVessel: (vessel: Vessel) => Promise<void>;
    viewAllVessels: () => Promise<Vessel[]>;
    deleteVessel: (id: string) => Promise<void>;
}
