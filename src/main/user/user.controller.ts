import { IpcHandle } from '@doubleshot/nest-electron'
import { Controller } from '@nestjs/common'
import { SysUser } from '../entities/sys-user.entity'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IpcHandle('getAllUsers')
  public async getAllUsers() {
    return this.userService.findAll()
  }

  @IpcHandle('getUserById')
  public async getUserById(_event: unknown, id: string) {
    return this.userService.findOne(id)
  }

  @IpcHandle('createUser')
  public async createUser(_event: unknown, userData: Partial<SysUser>) {
    return this.userService.create(userData)
  }

  @IpcHandle('updateUser')
  public async updateUser(_event: unknown, id: string, userData: Partial<SysUser>) {
    return this.userService.update(id, userData)
  }

  @IpcHandle('deleteUser')
  public async deleteUser(_event: unknown, id: string) {
    return this.userService.remove(id)
  }

  @IpcHandle('getUserByUsername')
  public async getUserByUsername(_event: unknown, username: string) {
    return this.userService.findByUsername(username)
  }
}
