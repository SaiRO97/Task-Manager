import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './enums/task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/auth.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder();

    if (status) {
      query.andWhere('Task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(Task.title LIKE :search OR Task.description LIKE :search)', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
    ) {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }
}
