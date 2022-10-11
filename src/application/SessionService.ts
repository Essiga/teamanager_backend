import {Session} from "@prisma/client";
import {ISessionRepository} from "../domain/repositories/ISessionRepository";
import {ISessionService} from "./api/ISessionService";
import {ITeaRepository} from "../domain/repositories/ITeaRepository";

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

    viewAllSessions(): Promise<Session[]> {
        return this.sessionRepository.viewAllSessions();
    }
}
