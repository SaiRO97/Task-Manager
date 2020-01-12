import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}


  getTaskById(id: number){

  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.tasks;
  //
  //   if (status) {
  //     tasks = this.tasks.filter(task => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = this.tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //   }
  //
  //   return tasks;
  // }
  //
  // getTaskById(id: string): Task {
  //   const singleTask = this.tasks.find(task => task.id === id);
  //
  //   if (!singleTask) {
  //     throw new NotFoundException(`Task with id:"${id}" not found`);
  //   }
  //
  //   return singleTask;
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task: Task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  //
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //
  //   this.tasks = [...this.tasks, task];
  //   return task;
  // }
  //
  // deleteTaskById(id: string): void {
  //   const singleTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== singleTask.id);
  // }
}
