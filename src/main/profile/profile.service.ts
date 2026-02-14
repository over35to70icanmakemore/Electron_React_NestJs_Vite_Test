import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from './profile.entity'

interface ProfileData {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  location: string
  school: string
  major: string
  grade: string
  bio: string
  achievements: string[]
}

@Injectable()
export class ProfileService implements OnModuleInit {
  private useDatabase = true
  private mockProfileData: ProfileData = {
    id: '1',
    name: '张三',
    avatar: '',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    location: '北京市海淀区',
    school: '清华大学',
    major: '计算机科学与技术',
    grade: '大三',
    bio: '热爱学习，追求卓越。对编程和技术充满热情，希望成为一名优秀的软件工程师。',
    achievements: ['学习之星', '编程达人', '优秀学生', '竞赛获奖者'],
  }

  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.profileRepository.count()
      if (count === 0) {
        await this.seedProfile()
      }
    }
    catch {
      this.useDatabase = false
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
      achievements: ['学习之星', '编程达人', '优秀学生', '竞赛获奖者'],
    })
    await this.profileRepository.save(profile)
  }

  async getProfile(): Promise<ProfileData | null> {
    if (!this.useDatabase)
      return this.mockProfileData
    try {
      return await this.profileRepository.findOne({ where: {} })
    }
    catch {
      return this.mockProfileData
    }
  }

  async updateProfile(profileData: Partial<ProfileData>): Promise<ProfileData | null> {
    if (!this.useDatabase) {
      this.mockProfileData = { ...this.mockProfileData, ...profileData }
      return this.mockProfileData
    }

    try {
      const profile = await this.profileRepository.findOne({ where: {} })
      if (!profile)
        return null
      Object.assign(profile, profileData)
      return await this.profileRepository.save(profile)
    }
    catch {
      this.mockProfileData = { ...this.mockProfileData, ...profileData }
      return this.mockProfileData
    }
  }

  async updateAvatar(avatar: string): Promise<void> {
    if (!this.useDatabase) {
      this.mockProfileData.avatar = avatar
      return
    }

    try {
      const profile = await this.profileRepository.findOne({ where: {} })
      if (profile) {
        profile.avatar = avatar
        await this.profileRepository.save(profile)
      }
    }
    catch {
      this.mockProfileData.avatar = avatar
    }
  }

  getStatistics(): { completedExams: number, averageScore: number, studyHours: number, ranking: string } {
    return {
      completedExams: 12,
      averageScore: 85,
      studyHours: 120,
      ranking: 'Top 10%',
    }
  }
}
