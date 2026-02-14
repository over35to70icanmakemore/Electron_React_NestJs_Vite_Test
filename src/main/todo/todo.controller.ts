import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import type { IpcMainEvent } from 'electron'
import { TodoService, TodoItem } from './todo.service'

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @IpcHandle('getAllTodos')
  public getAllTodos() {
    return this.todoService.getAllTodos()
  }

  @IpcHandle('getTodoById')
  public getTodoById(event: IpcMainEvent, id: string) {
    return this.todoService.getTodoById(id)
  }

  @IpcHandle('getTodosByFilter')
  public getTodosByFilter(event: IpcMainEvent, filter: 'all' | 'active' | 'completed') {
    return this.todoService.getTodosByFilter(filter)
  }

  @IpcHandle('createTodo')
  public createTodo(event: IpcMainEvent, todo: Omit<TodoItem, 'id' | 'completed'>) {
    return this.todoService.createTodo(todo)
  }

  @IpcHandle('updateTodo')
  public updateTodo(event: IpcMainEvent, id: string, todo: Partial<TodoItem>) {
    return this.todoService.updateTodo(id, todo)
  }

  @IpcHandle('toggleTodo')
  public toggleTodo(event: IpcMainEvent, id: string) {
    return this.todoService.toggleTodo(id)
  }

  @IpcHandle('deleteTodo')
  public deleteTodo(event: IpcMainEvent, id: string) {
    return this.todoService.deleteTodo(id)
  }

  @IpcHandle('getTodoStatistics')
  public getStatistics() {
    return this.todoService.getStatistics()
  }
}