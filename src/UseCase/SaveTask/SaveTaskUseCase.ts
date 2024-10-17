import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../../PrismaService';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto, id?: number]>
{
  constructor(private readonly prisma: PrismaService) {}

  async handle(dto: SaveTaskDto, id?: number): Promise<Task> {
    try {
      if (!dto.name || dto.name.trim().length === 0) {
        throw new Error('Task name is required.');
      }
      if (id) {
        return await this.prisma.task.update({
          where: { id },
          data: { name: dto.name },
        });
      } else {
        return await this.prisma.task.create({
          data: { name: dto.name },
        });
      }
    } catch (error) {
      console.error('Error while saving task:', error.message); // Log l'erreur
      throw new Error(`Could not save task: ${error.message}`);
    }
  }
}
