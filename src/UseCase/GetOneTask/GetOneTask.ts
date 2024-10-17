import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import TaskRepository from '../../Repositories/TaskRepository';
import { UseCase } from '../../index';

@Injectable()
export default class GetOneTask
  implements UseCase<Promise<Task>, [id: number]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
