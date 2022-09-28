import {PrismaClient} from '.prisma/client'
import express from 'express';

const prisma = new PrismaClient;

console.log("hello from typescript");

//const express = require('express')
const app = express();
const port = 3000;

async function main(){
    const tea = await prisma.tea.findMany();

    return tea;
}
//main(); 

app.get('/', (req, res) => {
    //res.send('Hello World!');
    main().then((data) => {
        console.log(data);
        res.send(data);
    }), () => {
        res.status(418).send("I'm a teapot.")
    };
    
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })

/* async function main(){
    const tea = await prisma.tea.findMany();
    console.log(tea);
}

main(); */

// async function main() {
//     const tea = await prisma.tea.create({
//         data:{
//             name: '2022 Yunnan Sourcing "Ma Zui Shi" Raw Pu-erh Tea Cake',
//             type:  'Sheng',
//             amount: 357,
//             link: 'https://yunnansourcing.com/collections/pu-erh-tea/products/2022-yunnan-sourcing-ma-zui-shi-raw-pu-erh-tea-cake',
//             year: 2022,
//         }
//     })
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
// export default main */
