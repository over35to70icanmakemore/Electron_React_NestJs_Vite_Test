import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'

interface TodoItem {
  id: string
  title: string
  completed: boolean
  priority: string
  due_date: string
  category: string
}

@Injectable()
export class TodoService implements OnModuleInit {
  private useDatabase = true
  private today = new Date()
  private formatDate = (date: Date): string => date.toISOString().split('T')[0]

  private mockTodoData: TodoItem[] = [
    { id: '1', title: '完成数学作业', completed: false, priority: 'high', due_date: this.formatDate(this.today), category: '学习' },
    { id: '2', title: '复习英语单词', completed: true, priority: 'medium', due_date: this.formatDate(new Date(this.today.getTime() - 86400000)), category: '学习' },
    { id: '3', title: '准备项目报告', completed: false, priority: 'high', due_date: this.formatDate(new Date(this.today.getTime() + 86400000)), category: '工作' },
    { id: '4', title: '阅读技术文档', completed: false, priority: 'low', due_date: this.formatDate(new Date(this.today.getTime() + 2 * 86400000)), category: '学习' }
  ]

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.todoRepository.count()
      if (count === 0) {
        await this.seedTodos()
      }
    } catch {
      this.useDatabase = false
    }
  }

  private async seedTodos() {
    const todoData = [
      { title: '完成数学作业', completed: false, priority: 'high', due_date: this.formatDate(this.today), category: '学习' },
      { title: '复习英语单词', completed: true, priority: 'medium', due_date: this.formatDate(new Date(this.today.getTime() - 86400000)), category: '学习' },
      { title: '准备项目报告', completed: false, priority: 'high', due_date: this.formatDate(new Date(this.today.getTime() + 86400000)), category: '工作' },
      { title: '阅读技术文档', completed: false, priority: 'low', due_date: this.formatDate(new Date(this.today.getTime() + 2 * 86400000)), category: '学习' }
    ]

    for (const data of todoData) {
      const todo = this.todoRepository.create(data)
      await this.todoRepository.save(todo)
    }
  }

  async getAllTodos(): Promise<TodoItem[]> {
    if (!this.useDatabase) return this.mockTodoData
    try {
      return await this.todoRepository.find()
    } catch {
      return this.mockTodoData
    }
  }

  async getTodoById(id: string): Promise<TodoItem | null> {
    if (!this.useDatabase) return this.mockTodoData.find(item => item.id === id) || null
    try {
      return await this.todoRepository.findOne({ where: { id } })
    } catch {
      return this.mockTodoData.find(item => item.id === id) || null
    }
  }

  async getTodosByFilter(filter: 'all' | 'active' | 'completed'): Promise<TodoItem[]> {
    if (!this.useDatabase) {
      if (filter === 'all') return this.mockTodoData
      if (filter === 'active') return this.mockTodoData.filter(item => !item.completed)
      return this.mockTodoData.filter(item => item.completed)
    }

    try {
      if (filter === 'all') return await this.todoRepository.find()
      if (filter === 'active') return await this.todoRepository.find({ where: { completed: false } })
      return await this.todoRepository.find({ where: { completed: true } })
    } catch {
      if (filter === 'all') return this.mockTodoData
      if (filter === 'active') return this.mockTodoData.filter(item => !item.completed)
      return this.mockTodoData.filter(item => item.completed)
    }
  }

  async createTodo(todoData: Partial<TodoItem>): Promise<TodoItem> {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title: todoData.title || '',
      completed: false,
      priority: todoData.priority || 'medium',
      due_date: todoData.due_date || '',
      category: todoData.category || ''
    }

    if (!this.useDatabase) {
      this.mockTodoData.push(newTodo)
      return newTodo
    }

    try {
      const todo = this.todoRepository.create(todoData)
      return await this.todoRepository.save(todo)
    } catch {
      this.mockTodoData.push(newTodo)
      return newTodo
    }
  }

  async updateTodo(id: string, todoData: Partial<TodoItem>): Promise<TodoItem | null> {
    if (!this.useDatabase) {
      const index = this.mockTodoData.findIndex(item => item.id === id)
      if (index === -1) return null
      this.mockTodoData[index] = { ...this.mockTodoData[index], ...todoData }
      return this.mockTodoData[index]
    }

    try {
      await this.todoRepository.update(id, todoData)
      return await this.todoRepository.findOne({ where: { id } })
    } catch {
      const index = this.mockTodoData.findIndex(item => item.id === id)
      if (index === -1) return null
      this.mockTodoData[index] = { ...this.mockTodoData[index], ...todoData }
      return this.mockTodoData[index]
    }
  }

  async toggleTodo(id: string): Promise<TodoItem | null> {
    if (!this.useDatabase) {
      const todo = this.mockTodoData.find(item => item.id === id)
      if (!todo) return null
      todo.completed = !todo.completed
      return todo
    }

    try {
      const todo = await this.todoRepository.findOne({ where: { id } })
      if (!todo) return null
      todo.completed = !todo.completed
      return await this.todoRepository.save(todo)
    } catch {
      const todo = this.mockTodoData.find(item => item.id === id)
      if (!todo) return null
      todo.completed = !todo.completed
      return todo
    }
  }

  async deleteTodo(id: string): Promise<boolean> {
    if (!this.useDatabase) {
      const index = this.mockTodoData.findIndex(item => item.id === id)
      if (index === -1) return false
      this.mockTodoData.splice(index, 1)
      return true
    }

    try {
      const result = await this.todoRepository.delete(id)
      return result.affected > 0
    } catch {
      const index = this.mockTodoData.findIndex(item => item.id === id)
      if (index === -1) return false
      this.mockTodoData.splice(index, 1)
      return true
    }
  }

  async getStatistics(): Promise<{ total: number; completed: number; active: number }> {
    if (!this.useDatabase) {
      const total = this.mockTodoData.length
      const completed = this.mockTodoData.filter(item => item.completed).length
      return { total, completed, active: total - completed }
    }

    try {
      const total = await this.todoRepository.count()
      const completed = await this.todoRepository.count({ where: { completed: true } })
      return { total, completed, active: total - completed }
    } catch {
      const total = this.mockTodoData.length
      const completed = this.mockTodoData.filter(item => item.completed).length
      return { total, completed, active: total - completed }
    }
  }
}