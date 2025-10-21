import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {

  @Inject()
  private readonly prisma: PrismaService;
    
  async create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {

    return await this.prisma.answers.create({
      data: {...createAnswerDto, userId, questionId }
    });
  }

  findAll() {
  return  this.prisma.answers.findMany();
  }

  findOne(id: number) {
    return this.prisma.answers.findUnique({ where: { id } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
        return await this.prisma.questions.update({
      where: {id},
      data: updateAnswerDto
    });
  }

  remove(id: number) {
    return this.prisma.answers.delete({ where: { id } });
  }
}
