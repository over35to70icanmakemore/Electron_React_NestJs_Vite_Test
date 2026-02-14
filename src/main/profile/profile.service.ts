import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from './profile.entity'

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async onModuleInit() {
    const count = await this.profileRepository.count()
    if (count === 0) {
      await this.seedProfile()
    }
  }

  private async seedProfile() {
    const profile = this.profileRepository.create({
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '138****8888',
      location: '北京市海淀区',
      school: '清华大学',
      major: '计算机科学与技术',
      grade: '大三',
      bio: '热爱学习，追求卓越。对编程和技术充满热情，希望成为一名优秀的软件工程师。',
      achievements: ['学习之星', '编程达人', '优秀学生', '竞赛获奖者']
    })
    await this.profileRepository.save(profile)
  }

  async getProfile(): Promise<Profile | null> {
    return this.profileRepository.findOne({ where: {} })
  }

  async updateProfile(profileData: Partial<Profile>): Promise<Profile | null> {
    const profile = await this.getProfile()
    if (!profile) return null
    
    Object.assign(profile, profileData)
    return this.profileRepository.save(profile)
  }

  async updateAvatar(avatar: string): Promise<void> {
    const profile = await this.getProfile()
    if (profile) {
      profile.avatar = avatar
      await this.profileRepository.save(profile)
    }
  }

  getStatistics(): { completedExams: number; averageScore: number; studyHours: number; ranking: string } {
    return {
      completedExams: 12,
      averageScore: 85,
      studyHours: 120,
      ranking: 'Top 10%'
    }
  }
}