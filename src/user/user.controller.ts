import { Body, Controller, Post } from '@nestjs/common';
import { User as UserModel} from 'generated/prisma';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

  @Post('signup') // requisição de criar um usuario
  async signupUser(
    @Body() userData: { email: string ; name: string; password: string;}, // ou usar o Prisma.UserCreateInput -> simbolizam o tipo do model/tabela criado
  ): Promise<UserModel> {
    return this.userService.createUser(userData); // chama o create user do user.service
  }

}
