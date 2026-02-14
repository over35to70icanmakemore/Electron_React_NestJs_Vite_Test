import { createHash } from 'node:crypto'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SysUser } from '../entities/sys-user.entity'

export interface LoginResponse {
  success: boolean
  message: string
  user?: {
    id: string
    username: string
    nickname: string
    email: string
    phone: string
    avatar: string
    gender: number
    status: number
    roles: string[]
    roleNames: string[]
  }
}

@Injectable()
export class AuthService {
  private currentUser: any = null

  constructor(
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
  ) {}

  private md5(text: string): string {
    return createHash('md5').update(text).digest('hex')
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    if (!username || !password) {
      throw new BadRequestException('用户名和密码不能为空')
    }

    const passwordHash = this.md5(password)

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.username = :username', { username })
      .andWhere('user.password = :password', { password: passwordHash })
      .getOne()

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误')
    }

    if (user.status !== 1) {
      throw new UnauthorizedException('该账号已被禁用')
    }

    if (user.is_active !== 1) {
      throw new UnauthorizedException('该账号尚未激活')
    }

    await this.userRepository.update(user.id, {
      last_login_time: new Date(),
      login_count: user.login_count + 1,
    })

    this.currentUser = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      gender: user.gender,
      status: user.status,
      roles: user.roles?.map(r => r.role_code) || [],
      roleNames: user.roles?.map(r => r.role_name) || [],
    }

    return {
      success: true,
      message: '登录成功',
      user: this.currentUser,
    }
  }

  async logout(): Promise<{ success: boolean, message: string }> {
    this.currentUser = null
    return {
      success: true,
      message: '退出登录成功',
    }
  }

  async getCurrentUser(): Promise<any> {
    if (!this.currentUser) {
      throw new UnauthorizedException('用户未登录')
    }
    return {
      success: true,
      user: this.currentUser,
    }
  }

  getLoggedInUser(): any {
    return this.currentUser
  }
}
