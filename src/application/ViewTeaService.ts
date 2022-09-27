import { Tea } from "@prisma/client";
import { IViewTeaService } from "./api/IViewTeaService";
import { ITeaRepository } from "../domain/repositories/ITeaRepository"

class ViewTeaService implements IViewTeaService {

    readonly teaRepository: ITeaRepository;
    
    //thanks Johnny
    constructor(teaRepository: ITeaRepository){
        this.teaRepository = teaRepository;
    }

    viewAllTeas(): Promise<Tea[]>{
        return this.teaRepository.viewAllTeas();
    }
}