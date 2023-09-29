import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } =
  process.env;
const MONGODB_CONNECTION_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

@Module({
  imports: [MongooseModule.forRoot(MONGODB_CONNECTION_URI)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
