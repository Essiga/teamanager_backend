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
import { SessionService } from "./application/SessionService";
import { ISessionRepository } from "./domain/repositories/ISessionRepository";
import { SessionRepository } from "./infrastructure/SessionRepository";
import { ISessionService } from "./application/api/ISessionService";
const prisma = new PrismaClient();

const teaRepository: ITeaRepository = new TeaRepository();
const viewTeaService: IViewTeaService = new ViewTeaService(teaRepository);
const addTeaService: IAddTeaService = new AddTeaService(teaRepository);
const vesselRepository: IVesselRepository = new VesselRepository();
const vesselService: IVesselService = new VesselService(vesselRepository);
const sessionRepository: ISessionRepository = new SessionRepository();
const sessionService: ISessionService = new SessionService(sessionRepository);

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

    try {
        createTea(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(503);
    }

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
});

app.get("/viewAllVessels", (req, res) => {
    console.log("body: ", req.body);
    vesselService.viewAllVessels().then((data)  => {
        res.send(data);
    }), () => {
        res.sendStatus(503);
    }
})

//TODO: Get tea and session info from request and auto calculate price 
app.post("/addSession", (req, res) => {
    console.log("body: ", req.body);
    sessionService.addSession(req.body);
    res.sendStatus(200);
})

app.get("/viewAllSessions", (req, res) => {
    sessionService.viewAllSessions().then((data) => {
        res.send(data);
    }), (error: any) => {
        res.send(error);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
