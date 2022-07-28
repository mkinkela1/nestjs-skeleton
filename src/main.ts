import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "src/app.module";
import { ValidationPipe } from "@nestjs/common";
import { configService } from "src/config/config.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Skeleton backend")
    .setDescription("Skeleton API examples")
    .setVersion("1.0")
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header",
      },
      "JWT"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(configService.getPort(), "0.0.0.0");
}
bootstrap();
