import { Session } from "@prisma/client";
import { ISessionRepository } from "../domain/repositories/ISessionRepository";
import { ISessionService } from "./api/ISessionService";

export class SessionService implements ISessionService {
    private sessionRepository: ISessionRepository;

    constructor(sessionRepository: ISessionRepository){
        this.sessionRepository = sessionRepository;
    }

    addSession(session: Session): Promise<void>{
        return this.sessionRepository.addSession(session);
    }

    viewAllSessions(): Promise<Session[]>{
        return this.sessionRepository.viewAllSessions();
    }
}