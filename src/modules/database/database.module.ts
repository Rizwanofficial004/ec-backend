import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ecbackend:ecbackend@cluster0.2b1ew.mongodb.net/',
    ),
  ],
})
export class DatabaseModule {}
