import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/task.status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id:"${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.remove(task);
  }

  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }


  //
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task: Task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
