import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessibleEntityValidationPipe } from './pipes/unprocessible-entity-validation.pipe';
import { Neo4jTypeInterceptor } from 'nest-neo4j/dist';
import { Neo4jErrorFilter } from './interceptors/neo4j-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new UnprocessibleEntityValidationPipe());
  app.useGlobalInterceptors(new Neo4jTypeInterceptor());

  // Use the Neo4j Error Filter on all rooutes
  app.useGlobalFilters(new Neo4jErrorFilter());

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
