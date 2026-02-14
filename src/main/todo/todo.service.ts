import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'

@Injectable()
export class TodoService implements OnModuleInit {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async onModuleInit() {
    const count = await this.todoRepository.count()
    if (count === 0) {
      await this.seedTodos()
    }
  }

  private async seedTodos() {
    const today = new Date()
    const formatDate = (date: Date): string => date.toISOString().split('T')[0]

    const todoData = [
      { title: '完成数学作业', completed: false, priority: 'high', due_date: formatDate(today), category: '学习' },
      { title: '复习英语单词', completed: true, priority: 'medium', due_date: formatDate(new Date(today.getTime() - 86400000)), category: '学习' },
      { title: '准备项目报告', completed: false, priority: 'high', due_date: formatDate(new Date(today.getTime() + 86400000)), category: '工作' },
      { title: '阅读技术文档', completed: false, priority: 'low', due_date: formatDate(new Date(today.getTime() + 2 * 86400000)), category: '学习' }
    ]

    for (const data of todoData) {
      const todo = this.todoRepository.create(data)
      await this.todoRepository.save(todo)
    }
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find()
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return this.todoRepository.findOne({ where: { id } })
  }

  async getTodosByFilter(filter: 'all' | 'active' | 'completed'): Promise<Todo[]> {
    if (filter === 'all') return this.getAllTodos()
    if (filter === 'active') return this.todoRepository.find({ where: { completed: false } })
    return this.todoRepository.find({ where: { completed: true } })
  }

  async createTodo(todoData: Partial<Todo>): Promise<Todo> {
    const todo = this.todoRepository.create(todoData)
    return this.todoRepository.save(todo)
  }

  async updateTodo(id: string, todoData: Partial<Todo>): Promise<Todo | null> {
    await this.todoRepository.update(id, todoData)
    return this.todoRepository.findOne({ where: { id } })
  }

  async toggleTodo(id: string): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne({ where: { id } })
    if (!todo) return null
    
    todo.completed = !todo.completed
    return this.todoRepository.save(todo)
  }

  async deleteTodo(id: string): Promise<boolean> {
    const result = await this.todoRepository.delete(id)
    return result.affected > 0
  }

  async getStatistics(): Promise<{ total: number; completed: number; active: number }> {
    const total = await this.todoRepository.count()
    const completed = await this.todoRepository.count({ where: { completed: true } })
    return {
      total,
      completed,
      active: total - completed
    }
  }
}