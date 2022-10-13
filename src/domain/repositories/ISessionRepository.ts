import {Session} from "@prisma/client";
import {SessionDTO} from "../../application/dtos/SessionDTO";

export interface ISessionRepository {
    addSession: (session: Session) => Promise<void>;
    viewAllSessions: () => Promise<SessionDTO[]>;
}
