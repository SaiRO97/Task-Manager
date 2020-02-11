import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DUPLICATE_USERNAME_ERROR_CODE, USERNAME_ALREADY_EXIST_ERROR } from 'src/const/common';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      if (error.code === DUPLICATE_USERNAME_ERROR_CODE) {
        throw new ConflictException(USERNAME_ALREADY_EXIST_ERROR);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

}
