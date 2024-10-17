import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Task } from '@prisma/client';
import SaveTaskDto from 'src/UseCase/SaveTask/SaveTaskDto';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    const taskId = typeof id === 'string' ? parseInt(id, 10) : id;
    console.log('Deleting task with ID:', taskId);
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async save(data: SaveTaskDto): Promise<Task> {
    if (!data.id) {
      return this.prisma.task.create({
        data: {
          name: data.name,
        },
      });
    }
    const taskId =
      typeof data.id === 'string' ? parseInt(data.id, 10) : data.id;
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        name: data.name,
      },
    });
  }
}
