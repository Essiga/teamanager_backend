import { PrismaClient } from ".prisma/client";
import { Prisma, Tea } from "@prisma/client";
import express from "express";
import { IAddTeaService } from "./application/api/IAddTeaService";
import { IViewTeaService } from "./application/api/IViewTeaService";
import { AddTeaService } from "./application/AddTeaService";
import { ViewTeaService } from "./application/ViewTeaService";
import { ITeaRepository } from "./domain/repositories/ITeaRepository";
import { TeaRepository } from "./infrastructure/TeaRepository";
import { IVesselService } from "./application/api/IVesselService";
import { VesselService } from "./application/VesselService";
import { IVesselRepository } from "./domain/repositories/IVesselRepository";
import { VesselRepository } from "./infrastructure/VesselRepository";
const prisma = new PrismaClient();

const teaRepository: ITeaRepository = new TeaRepository();
const viewTeaService: IViewTeaService = new ViewTeaService(teaRepository);
const addTeaService: IAddTeaService = new AddTeaService(teaRepository);
const vesselRepository: IVesselRepository = new VesselRepository();
const vesselService: IVesselService = new VesselService(vesselRepository);

console.log("hello from typescript");
const app = express();
app.use(express.json());
const port = 3000;

async function createTea(tea: Tea) {
  const result = await addTeaService.addTea(tea);
}

function viewAllTeas() {
  const tea = viewTeaService.viewAllTeas();

  return tea;
}

app.post("/addTea", (req, res) => {

  createTea(req.body);
  res.sendStatus(200);
});

app.get("/viewAllTeas", (req, res) => {
  viewAllTeas().then((data) => {
    res.send(data);
  }),
    () => {
      res.status(418).send("I'm a teapot");
    };
});

app.post("/addVessel", (req, res) => {
    console.log("body: ", req.body);
    vesselService.addVessel(req.body);
    res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
