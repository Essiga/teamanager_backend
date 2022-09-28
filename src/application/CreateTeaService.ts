import { Tea } from "@prisma/client";
import { ITeaRepository } from "../domain/repositories/ITeaRepository";

export class CreateTeaService {
    private teaRepository: ITeaRepository;

    constructor(teaRepository: ITeaRepository){
        this.teaRepository = teaRepository;
    }

    async createTea(tea: Tea): Promise<void>{
        this.teaRepository.createTea(tea);
    }
}