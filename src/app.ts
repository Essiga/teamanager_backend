import { PrismaClient } from ".prisma/client";
import { Prisma, Tea } from "@prisma/client";
import express from "express";
import { ICreateTeaService } from "./application/api/ICreateTeaService";
import { IViewTeaService } from "./application/api/IViewTeaService";
import { CreateTeaService } from "./application/CreateTeaService";
import { ViewTeaService } from "./application/ViewTeaService";
import { ITeaRepository } from "./domain/repositories/ITeaRepository";
import { TeaRepository } from "./infrastructure/TeaRepository";
const prisma = new PrismaClient();

const teaRepository: ITeaRepository = new TeaRepository();
const viewTeaService: IViewTeaService = new ViewTeaService(teaRepository);
const createTeaService: ICreateTeaService = new CreateTeaService(teaRepository);

console.log("hello from typescript");
const app = express();
app.use(express.json());
const port = 3000;

async function createTea(tea: Tea) {
  const result = await createTeaService.createTea(tea);
}

function viewAllTeas() {
  const tea = viewTeaService.viewAllTeas();

  return tea;
}

app.post("/createTea", (req, res) => {
  console.log("body: ", req.body);
  createTea(<Tea>req.body);
  res.sendStatus(200);
});

app.get("/viewAllTeas", (req, res) => {
  viewAllTeas().then((data) => {
    res.send(data);
  }),
    () => {
      res.status(418).send("I'm a teapot.");
    };
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
