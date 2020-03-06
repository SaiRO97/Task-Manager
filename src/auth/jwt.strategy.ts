import { PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './auth.entity';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SecretJWTKey'
        })
    }

    async validate(payload: JwtPayload):Promise<User>{
        const {username} = payload;
        const user = await this.userRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}