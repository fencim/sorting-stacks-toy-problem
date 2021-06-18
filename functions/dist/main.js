"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restapi = void 0;
const functions = require("firebase-functions");
const express = require("express");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const sorting_stack_app_module_1 = require("./sorting-stack-app.module");
const platform_express_1 = require("@nestjs/platform-express");
const expressServer = express();
async function bootstrap(expressInstance) {
    const app = await core_1.NestFactory.create(sorting_stack_app_module_1.SortingStackAppModule, new platform_express_1.ExpressAdapter(expressInstance));
    const config = new swagger_1.DocumentBuilder()
        .addServer("https://asia-northeast1-sorting-stacks-game.cloudfunctions.net/restapi")
        .addServer("/sorting-stacks-game/asia-northeast1/restapi")
        .setTitle('Sorting Stack API')
        .setDescription('REST API for Sorting Stacks Game')
        .setVersion('1.0')
        .addTag('sorting stacks game')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    app.enableCors({
        "origin": true,
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        "credentials": true
    });
    await app.init();
}
exports.restapi = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
    await bootstrap(expressServer);
    expressServer(request, response);
});
//# sourceMappingURL=main.js.map