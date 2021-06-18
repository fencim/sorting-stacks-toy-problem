import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SortingStackAppModule } from './sorting-stack-app.module';
import { ExpressAdapter } from "@nestjs/platform-express";

const expressServer = express();

async function bootstrap(expressInstance:any) {
  const app = await NestFactory.create(SortingStackAppModule, new ExpressAdapter(expressInstance));
  const config = new DocumentBuilder()
    .addServer("https://asia-northeast1-sorting-stacks-game.cloudfunctions.net/restapi")
    .addServer("/sorting-stacks-game/asia-northeast1/restapi")
    .setTitle('Sorting Stack API')
    .setDescription('REST API for Sorting Stacks Game')
    .setVersion('1.0')
    .addTag('sorting stacks game')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors({
    "origin":true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "credentials":true,
    "allowedHeaders": "Content-Type, Accept,Authorization",
  });
  await app.init();
}

export const restapi = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
    await bootstrap(expressServer);
    expressServer(request, response);
});
