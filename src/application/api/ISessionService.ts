import { Session } from "@prisma/client";

export interface ISessionService {
    addSession:(session: Session) => Promise<void>;
    viewAllSessions:() => Promise<Session[]>;
}