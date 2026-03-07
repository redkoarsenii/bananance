import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityModule } from './modules/identity/identity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'banananceDB',
      username: 'postgres',
      password: 'root',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      migrations: [join(__dirname, '**', '*.migration{.ts,.js}')],
      synchronize: true,
    }),
    IdentityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
