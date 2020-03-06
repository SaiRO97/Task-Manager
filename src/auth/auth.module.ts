import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
          imports: [
            PassportModule.register({
                                      defaultStrategy: 'jwt',
                                    }),
            JwtModule.register({
                                 secret: 'SecretJWTKey',
                                 signOptions: {
                                   expiresIn: 3600,
                                 },
                               }),
            TypeOrmModule.forFeature([UserRepository]),
          ],
          controllers: [AuthController],
          providers: [
            AuthService,
            JwtStrategy
          ],
          exports:[
            JwtStrategy,
            PassportModule
          ]
        })
export class AuthModule {
}
