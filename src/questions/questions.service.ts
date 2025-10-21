import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {

  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: number) { //INSERT INTO questions (title, description, userId)
    //VALUES ('Título da questão', 'Descrição da questão', id usuario logado);
    return await this.prisma.questions.create({
      data: { ...createQuestionDto, userId }
    });
  }

  async findAll() { // SELECT * FROM questions;
    return await this.prisma.questions.findMany();
  }

  findOne(id: number) { //SELECT * FROM questions WHERE id = id;
    return this.prisma.questions.findUnique({ where: { id } });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) { //UPDATE questions
//SET title = 'novo título', body = 'novo conteúdo'
//WHERE id = id usuario logado;
    return await this.prisma.questions.update({
      where: {id},
      data: updateQuestionDto
    });
  }

  remove(id: number) { //DELETE FROM questions WHERE id id;
    return this.prisma.questions.delete({ where: { id } });
  }
}
