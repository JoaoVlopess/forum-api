import { Injectable } from '@nestjs/common';
import { User, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService { // classe operações CRUD sobre o modelo user do banco
    constructor(private prisma: PrismaService){} // PrismaService = conector com o banco

    async createUser(data: Prisma.UserCreateInput) { // cria um usuario com os dados (data) enviados
    const hashPassword = await bcrypt.hash(data.password, 10);  // cria uma senha encriptada de 10 rodadas de processamento de encriptamento

    return this.prisma.user.create({
      data: {...data, password: hashPassword}
    });
  }

    async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput, // tipo que o Prisma gera para filtros de busca por colunas únicas (id ou outro)
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput, //id do usuario por exemplo
    });
  }

   async updateUser(params: {
    where: Prisma.UserWhereUniqueInput; //id por exemplo
    data: Prisma.UserUpdateInput; // os campos que você quer alterar
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ 
      data,
      where,
    }); // traduz para UPDATE User SET name = 'João Atualizado' WHERE id = 'abc-123'; ex
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> { //pega o id por exemplo
    return this.prisma.user.delete({
      where,
    }); // deleta o usuario baseado no id
  }
  
}
