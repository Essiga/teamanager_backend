import { PrismaClient, PrismaPromise, Tea } from "@prisma/client";
import { ITeaRepository } from "../domain/repositories/ITeaRepository";
//import { Tea } from "../domain/Tea";

class TeaRepository implements ITeaRepository {
  prisma = new PrismaClient();

  viewAllTeas(): Promise<Tea[]> {
    return new Promise((resolve, reject) => {
      this.prisma.tea.findMany().then(
        (data) => {
            resolve(data);
        },
        () => {
          reject();
        }
      );
    });
  }
}
