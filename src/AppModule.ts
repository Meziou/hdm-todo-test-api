import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import TaskController from './Controllers/TaskController';
import { PrismaService } from './PrismaService';
import TaskRepository from './Repositories/TaskRepository';
import UseCaseFactory from './UseCase/UseCaseFactory';
import GetAllTasksUseCase from './UseCase/GetAllTasks/GetAllTasksUseCase'; // Ajout des cas d'utilisation
import SaveTaskUseCase from './UseCase/SaveTask/SaveTaskUseCase'; // Ajout des cas d'utilisation
import DeleteTask from './UseCase/DeleteTask/DeleteTask'; // Ajout des cas d'utilisation
import GetOneTask from './UseCase/GetOneTask/getOneTask';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TaskController],
  providers: [
    PrismaService,
    TaskRepository,
    UseCaseFactory,
    GetAllTasksUseCase,
    SaveTaskUseCase,
    DeleteTask,
    GetOneTask,
  ],
})
export class AppModule {}
