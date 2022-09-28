import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient;

console.log("hello from typescript");


async function main(){
    const tea = await prisma.tea.findMany();
    console.log(tea);
}

main();
