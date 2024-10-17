import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class DeleteTask
  implements UseCase<Promise<boolean>, [id: number]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number) {
    try {
      console.log('ID to delete:', id); // Ajouter un log pour vérifier l'ID
      await this.taskRepository.delete(id);
      return true;
    } catch (error) {
      console.error('Error while deleting task:', error); // Ajouter un log de l'erreur
      throw new BadRequestException('Could not delete task: ' + error.message);
    }
  }
}
