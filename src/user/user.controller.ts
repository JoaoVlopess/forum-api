import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { User as UserModel} from 'generated/prisma';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

  @Post() // requisição de criar um usuario
  async signupUser(
    @Body() userData: { email: string ; name: string; password: string;}, // ou usar o Prisma.UserCreateInput -> simbolizam o tipo do model/tabela criado
  ): Promise<UserModel> {
    return this.userService.createUser(userData); // chama o create user do user.service
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.user({ id: Number(id) });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  @Put(':id')
  async updateUser(
    @Body() userData: {email: string ; name: string; password: string},
    @Param('id') id :string
  ): Promise<UserModel> {
      return this.userService.updateUser({
        where: { id: Number(id)},
        data: userData});
    }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({id: Number(id)})
  }
}



