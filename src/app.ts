import {PrismaClient} from ".prisma/client";
import {Session, Tea, Vessel} from "@prisma/client";
import express from "express";

import {IAddTeaService} from "./application/api/IAddTeaService";
import {IViewTeaService} from "./application/api/IViewTeaService";
import {AddTeaService} from "./application/AddTeaService";
import {ViewTeaService} from "./application/ViewTeaService";
import {ITeaRepository} from "./domain/repositories/ITeaRepository";
import {TeaRepository} from "./infrastructure/TeaRepository";
import {IVesselService} from "./application/api/IVesselService";
import {VesselService} from "./application/VesselService";
import {IVesselRepository} from "./domain/repositories/IVesselRepository";
import {VesselRepository} from "./infrastructure/VesselRepository";
import {SessionService} from "./application/SessionService";
import {ISessionRepository} from "./domain/repositories/ISessionRepository";
import {SessionRepository} from "./infrastructure/SessionRepository";
import {ISessionService} from "./application/api/ISessionService";

// noinspection JSUnusedLocalSymbols
const prisma = new PrismaClient();

const teaRepository: ITeaRepository = new TeaRepository();
const viewTeaService: IViewTeaService = new ViewTeaService(teaRepository);
const addTeaService: IAddTeaService = new AddTeaService(teaRepository);
const vesselRepository: IVesselRepository = new VesselRepository();
const vesselService: IVesselService = new VesselService(vesselRepository);
const sessionRepository: ISessionRepository = new SessionRepository();
const sessionService: ISessionService = new SessionService(sessionRepository);

const expressOasGenerator = require('express-oas-generator');

const app = express();
app.use(express.json());
const port = 3000;

expressOasGenerator.init(app, {});

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tea Manager',
            version: '1.0.0',
        },
    },
    apis: ['./src/app.ts'], // files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-myDocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-mySpecs', (req, res) => res.json(swaggerSpec))

/**
 * @openapi
 * /addTea:
 *   post:
 *     description: Add a new tea.
 *     responses:
 *       200:
 *         description: Successfully added a new tea.
 *       500:
 *         description: Internal server error
 */
app.post("/addTea", (req, res) => {
    addTeaService.addTea(req.body as Tea).then(
        () => {
            res.sendStatus(200);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
});

/**
 * @openapi
 * /viewAllTeas:
 *   get:
 *     description: Get all teas.
 *     responses:
 *       200:
 *         description: Successfully got all teas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/api-schemas/Tea'
 */
app.get("/viewAllTeas", (req, res) => {
    viewTeaService.viewAllTeas().then(
        (data) => {
            res.send(data);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
});

app.post("/addVessel", (req, res) => {
    vesselService.addVessel(req.body as Vessel).then(
        () => {
            res.sendStatus(200);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
});

app.get("/viewAllVessels", (req, res) => {
    vesselService.viewAllVessels().then(
        (data) => {
            res.send(data);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
})

//TODO: Get tea and session info from request and auto calculate price
app.post("/addSession", (req, res) => {
    sessionService.addSession(req.body as Session).then(
        () => {
            res.sendStatus(200);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
})

app.get("/viewAllSessions", (req, res) => {
    sessionService.viewAllSessions().then(
        (data) => {
            res.send(data);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
})

app.listen(port, () => {
    console.log(`TeaManager listening on port ${port}`);
});
