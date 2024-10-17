import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import DeleteTask from 'src/UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from 'src/UseCase/GetAllTasks/GetAllTasksUseCase';
import GetOneTask from 'src/UseCase/GetOneTask/getOneTask';
import SaveTaskDto from 'src/UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from 'src/UseCase/SaveTask/SaveTaskUseCase';

@Controller('tasks')
export default class TaskController {
  constructor(
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly saveTaskUseCase: SaveTaskUseCase,
    private readonly deleteTask: DeleteTask,
    private readonly getOneTask: GetOneTask,
  ) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.getAllTasksUseCase.handle();
  }
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      throw new NotFoundException('Invalid task ID');
    }
    return this.getOneTask.handle(taskId);
  }
  @Post()
  async createTask(@Body() saveTaskDto: SaveTaskDto): Promise<Task> {
    return this.saveTaskUseCase.handle(saveTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() saveTaskDto: SaveTaskDto,
  ): Promise<Task> {
    const taskId = parseInt(id, 10);
    return this.saveTaskUseCase.handle(saveTaskDto, taskId);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const parsedId = parseInt(id, 10); // Conversion de l'ID en entier
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid task ID');
    }
    return this.deleteTask.handle(parsedId);
  }
}
