"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const sorting_stack_app_module_1 = require("./sorting-stack-app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(sorting_stack_app_module_1.SortingStackAppModule);
    app.enableCors({ origin: "*" });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sorting Stack API')
        .setDescription('REST API for Sorting Stacks Game')
        .setVersion('1.0')
        .addTag('sorting stacks game')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.listen(3030);
}
bootstrap();
//# sourceMappingURL=start.js.map