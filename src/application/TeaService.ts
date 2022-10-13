import {Tea} from "@prisma/client";
import {ITeaRepository} from "../domain/repositories/ITeaRepository";
import {ITeaService} from "./api/ITeaService";

export class TeaService implements ITeaService {
    private teaRepository: ITeaRepository;

    constructor(teaRepository: ITeaRepository) {
        this.teaRepository = teaRepository;
    }

    async addTea(tea: Tea): Promise<void> {
        return this.teaRepository.addTea(tea);
    }

    async getTeaById(teaId: string): Promise<Tea>{
        return this.teaRepository.getTeaById(teaId);
    }

    viewAllTeas(): Promise<Tea[]> {
        return this.teaRepository.viewAllTeas();
    }
    async updateTea(tea:Tea){
        return this.teaRepository.updateTea(tea);
    }
}
