import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SortingStackAppModule } from './sorting-stack-app.module';

async function bootstrap() {
    const app = await NestFactory.create(SortingStackAppModule);
    app.enableCors({ origin: "*" });
    const config = new DocumentBuilder()
        .setTitle('Sorting Stack API')
        .setDescription('REST API for Sorting Stacks Game')
        .setVersion('1.0')
        .addTag('sorting stacks game')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.listen(3030);
}
bootstrap();
