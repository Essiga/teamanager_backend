import { Vessel } from "@prisma/client";
import { IVesselRepository } from "../domain/repositories/IVesselRepository";
import { IVesselService } from "./api/IVesselService";

export class VesselService implements IVesselService{
    private vesselRepository: IVesselRepository;

    constructor(vesselRepository: IVesselRepository){
        this.vesselRepository = vesselRepository;
    }

    addVessel(vessel: Vessel): Promise<void> {
        return this.vesselRepository.addVessel(vessel);
    }

    viewAllVessels(): Promise<Vessel[]> {
        return this.vesselRepository.viewAllVessels();
    }

}