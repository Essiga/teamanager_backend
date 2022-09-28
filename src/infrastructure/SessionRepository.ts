import { PrismaClient } from "@prisma/client";
import { ISessionRepository } from "../domain/repositories/ISessionRepository";

export class SessionRepository implements ISessionRepository {

    private prisma = new PrismaClient();

}