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

const swaggerUi = require('swagger-ui-express');

const resolve = require('json-refs').resolveRefs;
const YAML = require('js-yaml');
const fs   = require('fs');

/**
 * Return JSON with resolved references
 * @param {array | object} root - The structure to find JSON References within (Swagger spec)
 * @returns {Promise.<JSON>}
 */
const multiFileSwagger = (root: any) => {
    const options = {
        filter: ['relative', 'remote'],
        loaderOptions: {
            processContent: function (res: any, callback: any) {
                callback(null, YAML.load(res.text));
            }
        }
    };

    return resolve(root, options).then(
        function (results: any) {
            return results.resolved;
        },
        function (err: any) {
            console.log(err.stack);
        }
    );
};

(async () => {

    let rootObj = YAML.load(
        fs.readFileSync(path.resolve(__dirname, "../openAPI/index.yaml"), "utf-8")
    );

    let openapiSpecs = await multiFileSwagger(rootObj);

    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecs));

    router.get('/api-specs', (req, res) => res.json(openapiSpecs))

    router.post("/addTea", (req, res) => {
        addTeaService.addTea(req.body as Tea).then(
            () => {
                res.sendStatus(200);
            },
            (err) => {
                res.status(res.statusCode).send(err);
            });
    });

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
})();
