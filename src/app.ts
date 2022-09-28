import {PrismaClient} from '.prisma/client'
import express from 'express';
import { IViewTeaService } from './application/api/IViewTeaService';
import { ViewTeaService } from './application/ViewTeaService';
import { ITeaRepository } from './domain/repositories/ITeaRepository';
import { TeaRepository } from './infrastructure/TeaRepository';
const prisma = new PrismaClient;

const teaRepository: ITeaRepository = new TeaRepository;
const viewTeaService: IViewTeaService = new ViewTeaService(teaRepository);

console.log("hello from typescript");


const app = express();
const port = 3000;

async function viewAllTeas(){
    const tea = await viewTeaService.viewAllTeas();

    return tea;
}

app.get('/', (req, res) => {

    viewAllTeas().then((data) => {
        console.log(data);
        res.send(data);
    }), () => {
        res.status(418).send("I'm a teapot.")
    };
    
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })

