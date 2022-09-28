import { Vessel } from "@prisma/client";
import { IVesselRepository } from "../domain/repositories/IVesselRepository";

export class VesselService implements IVesselRepository{
    private vesselRepository: IVesselRepository;

    constructor(vesselRepository: IVesselRepository){
        this.vesselRepository = vesselRepository;
    }

    addVessel(vessel: Vessel): Promise<void> {
        return this.vesselRepository.addVessel(vessel);
    }

}