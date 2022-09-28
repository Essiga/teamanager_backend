import { Tea } from "@prisma/client";
import { ITeaRepository } from "../domain/repositories/ITeaRepository";

export class CreateTeaService {
    private teaRepository: ITeaRepository;

    constructor(teaRepository: ITeaRepository){
        this.teaRepository = teaRepository;
    }

    async addTea(tea: Tea): Promise<void>{
        this.teaRepository.addTea(tea);
    }
}