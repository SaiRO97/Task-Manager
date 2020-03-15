import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/task.status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/auth.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id:"${id}" not found`);
    }
    return found;
  }

  createTask(
    createTaskDto: CreateTaskDto,
    user: User
    ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.remove(task);
  }

  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

}
