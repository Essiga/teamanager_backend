import {PrismaClient, Session} from "@prisma/client";
import {ISessionRepository} from "../domain/repositories/ISessionRepository";

export class SessionRepository implements ISessionRepository {
    private prisma = new PrismaClient();

    async addSession(session: Session): Promise<void> {

        try {
            await this.prisma.session.create({
                data: session,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async viewAllSessions(): Promise<Session[]> {
        return await this.prisma.session.findMany();
    }
}
