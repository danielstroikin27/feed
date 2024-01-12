import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('DATABASE_URI'),
    //     // user: configService.get<string>('DATABASE_USER'),
    //     // pass: configService.get<string>('DATABASE_PASSWORD'),
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRoot('mongodb://localhost/feed'),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      // dbName: process.env.DATABASE_NAME,
      // auth: {
      //   username: process.env.DATABASE_USER,
      //   password: process.env.DATABASE_PASS,
      // },
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
