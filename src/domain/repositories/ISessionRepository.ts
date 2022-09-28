import { Session } from "@prisma/client";

export interface ISessionRepository {
    addSession:(session: Session) => Promise<void>;
    viewAllSessions:() => Promise<Session[]>;
}