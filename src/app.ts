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

import path from 'path';

const app = express();
const router = express.Router();

router.use(express.json());

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Tea Manager',
        version: '1.0.0',
        description: 'A tea manager to manage teas, YES!'
    },
    servers: [{url: '/api'}]
}

const options = {
    failOnErrors: true,
    definition: swaggerDefinition,
    apis: [
        path.join(__dirname, '/app.ts'),
        path.join(__dirname, '/api-schemas/yaml/*.yaml'),
        path.join(__dirname, '/api-schemas/json/*.json')
    ],
};

const swaggerSpec = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.get('/api-specs', (req, res) => res.json(swaggerSpec))

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
router.post("/addTea", (req, res) => {
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
 *                 $ref: '/api-schemas/json/Tea#'
 */
router.get("/viewAllTeas", (req, res) => {
    viewTeaService.viewAllTeas().then(
        (data) => {
            res.send(data);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
});

router.post("/addVessel", (req, res) => {
    vesselService.addVessel(req.body as Vessel).then(
        () => {
            res.sendStatus(200);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
});

router.get("/viewAllVessels", (req, res) => {
    vesselService.viewAllVessels().then(
        (data) => {
            res.send(data);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
})

//TODO: Get tea and session info from request and auto calculate price
router.post("/addSession", (req, res) => {
    sessionService.addSession(req.body as Session).then(
        () => {
            res.sendStatus(200);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
})

router.get("/viewAllSessions", (req, res) => {
    sessionService.viewAllSessions().then(
        (data) => {
            res.send(data);
        },
        (err) => {
            res.status(res.statusCode).send(err);
        });
})

app.use('/api', router);

const port = 3000;
app.listen(port, () => {
    console.log(`TeaManager listening on port ${port}`);
});
