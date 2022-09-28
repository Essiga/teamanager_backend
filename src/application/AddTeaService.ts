import { Tea } from "@prisma/client";
import { ITeaRepository } from "../domain/repositories/ITeaRepository";
import { IAddTeaService } from "./api/IAddTeaService";

export class AddTeaService implements IAddTeaService {
    private teaRepository: ITeaRepository;

    constructor(teaRepository: ITeaRepository){
        this.teaRepository = teaRepository;
    }

    async addTea(tea: Tea): Promise<void>{
        this.teaRepository.addTea(tea);
    }
}