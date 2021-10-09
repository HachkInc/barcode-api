import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    // binds ValidationPipe to the entire application
    app.useGlobalPipes(new ValidationPipe());

    // apply transform to all responses
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const config = new DocumentBuilder()
      .setTitle("DB API")
      .setDescription("REST API")
      .setVersion("0.1.0")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, { customSiteTitle: "Prisma Day" });

    await app.listen(PORT, () => {
      console.log("Server has been started on port: ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
