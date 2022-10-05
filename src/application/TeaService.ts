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

    viewAllTeas(): Promise<Tea[]> {
        return this.teaRepository.viewAllTeas();
    }
}
