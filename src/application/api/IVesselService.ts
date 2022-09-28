import { Vessel } from "@prisma/client";

export interface IVesselService{
    addVessel:(vessel: Vessel) => void;
}