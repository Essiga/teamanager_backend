import { ISessionService } from "./api/ISessionService";

export class SessionService implements ISessionService {
    private sessionRepository: ISessionRepository;
}