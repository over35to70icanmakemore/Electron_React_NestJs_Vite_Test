import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import { TodoService } from './todo.service'
import { Todo } from './todo.entity'

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @IpcHandle('getAllTodos')
  public getAllTodos() {
    return this.todoService.getAllTodos()
  }

  @IpcHandle('getTodoById')
  public getTodoById(_event: unknown, id: string) {
    return this.todoService.getTodoById(id)
  }

  @IpcHandle('getTodosByFilter')
  public getTodosByFilter(_event: unknown, filter: 'all' | 'active' | 'completed') {
    return this.todoService.getTodosByFilter(filter)
  }

  @IpcHandle('createTodo')
  public createTodo(_event: unknown, todo: Omit<Todo, 'id' | 'completed'>) {
    return this.todoService.createTodo(todo)
  }

  @IpcHandle('updateTodo')
  public updateTodo(_event: unknown, id: string, todo: Partial<Todo>) {
    return this.todoService.updateTodo(id, todo)
  }

  @IpcHandle('toggleTodo')
  public toggleTodo(_event: unknown, id: string) {
    return this.todoService.toggleTodo(id)
  }

  @IpcHandle('deleteTodo')
  public deleteTodo(_event: unknown, id: string) {
    return this.todoService.deleteTodo(id)
  }

  @IpcHandle('getTodoStatistics')
  public getStatistics() {
    return this.todoService.getStatistics()
  }
}