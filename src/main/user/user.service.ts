import { createHash } from 'node:crypto'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SysUser } from '../entities/sys-user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
  ) {}

  private md5(text: string): string {
    return createHash('md5').update(text).digest('hex')
  }

  async findAll(): Promise<{ success: boolean, data: SysUser[] }> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .select([
        'user.id',
        'user.username',
        'user.nickname',
        'user.email',
        'user.phone',
        'user.avatar',
        'user.gender',
        'user.status',
        'user.is_active',
        'user.last_login_time',
        'user.login_count',
        'user.create_time',
        'user.update_time',
        'role.id',
        'role.role_name',
        'role.role_code',
      ])
      .getMany()

    return {
      success: true,
      data: users,
    }
  }

  async findOne(id: string): Promise<{ success: boolean, data: SysUser }> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .select([
        'user.id',
        'user.username',
        'user.nickname',
        'user.email',
        'user.phone',
        'user.avatar',
        'user.gender',
        'user.status',
        'user.is_active',
        'user.last_login_time',
        'user.login_count',
        'user.create_time',
        'user.update_time',
        'user.remark',
        'role.id',
        'role.role_name',
        'role.role_code',
      ])
      .where('user.id = :id', { id })
      .getOne()

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    return {
      success: true,
      data: user,
    }
  }

  async findByUsername(username: string): Promise<{ success: boolean, data: SysUser | null }> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .select([
        'user.id',
        'user.username',
        'user.nickname',
        'user.email',
        'user.phone',
        'user.avatar',
        'user.gender',
        'user.status',
        'role.id',
        'role.role_name',
        'role.role_code',
      ])
      .where('user.username = :username', { username })
      .getOne()

    return {
      success: true,
      data: user,
    }
  }

  async create(userData: Partial<SysUser>): Promise<{ success: boolean, message: string, data?: SysUser }> {
    const existingUser = await this.userRepository.findOne({
      where: [{ username: userData.username }, { email: userData.email }, { phone: userData.phone }],
    })

    if (existingUser) {
      if (existingUser.username === userData.username) {
        throw new BadRequestException('用户名已存在')
      }
      if (existingUser.email === userData.email) {
        throw new BadRequestException('邮箱已存在')
      }
      if (existingUser.phone === userData.phone) {
        throw new BadRequestException('手机号已存在')
      }
    }

    if (userData.password) {
      userData.password = this.md5(userData.password)
    }

    const user = this.userRepository.create(userData)
    const savedUser = await this.userRepository.save(user)

    return {
      success: true,
      message: '用户创建成功',
      data: savedUser,
    }
  }

  async update(id: string, userData: Partial<SysUser>): Promise<{ success: boolean, message: string }> {
    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    if (userData.password) {
      userData.password = this.md5(userData.password)
    }

    await this.userRepository.update(id, userData)

    return {
      success: true,
      message: '用户更新成功',
    }
  }

  async remove(id: string): Promise<{ success: boolean, message: string }> {
    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    await this.userRepository.delete(id)

    return {
      success: true,
      message: '用户删除成功',
    }
  }
}
