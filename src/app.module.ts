import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
          imports: [
            ConfigModule.forRoot({
                                   isGlobal: true,
                                   envFilePath: './.env',
                                 }),
            TypeOrmModule.forRoot(typeOrmConfig),
            TasksModule,
            AuthModule,
          ],
        })
export class AppModule {
}
