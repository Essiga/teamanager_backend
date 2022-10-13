import {Session} from "@prisma/client";
import {ISessionRepository} from "../domain/repositories/ISessionRepository";
import {ISessionService} from "./api/ISessionService";
import {ITeaRepository} from "../domain/repositories/ITeaRepository";
import {SessionDTO} from "./dtos/SessionDTO";

export class SessionService implements ISessionService {

    private sessionRepository: ISessionRepository;
    private teaRepository: ITeaRepository;

    constructor(sessionRepository: ISessionRepository, teaRepository: ITeaRepository) {
        this.teaRepository = teaRepository;
        this.sessionRepository = sessionRepository;
    }

    addSession(session: Session): Promise<void> {
        this.teaRepository.subtractAmount(session.teaId, session.amount);
        return this.sessionRepository.addSession(session);
    }

    async viewAllSessions(): Promise<SessionDTO[]> {
        let sessions = await this.sessionRepository.viewAllSessions();
        let sessionDTOs: SessionDTO[] = [];

        for (let i = 0; i < sessions.length; i++) {
            sessionDTOs.push(sessions[i]);

            let tea = await this.teaRepository.getTeaById(sessions[i].teaId);
            sessionDTOs[i].teaName = tea.name;
        }

        return sessionDTOs
    }
}
