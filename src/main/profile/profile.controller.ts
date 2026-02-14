import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import type { IpcMainEvent } from 'electron'
import { ProfileService } from './profile.service'
import { Profile } from './profile.entity'

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @IpcHandle('getProfile')
  public async getProfile() {
    return this.profileService.getProfile()
  }

  @IpcHandle('updateProfile')
  public async updateProfile(event: IpcMainEvent, profile: Partial<Profile>) {
    return this.profileService.updateProfile(profile)
  }

  @IpcHandle('getUserStatistics')
  public getStatistics() {
    return this.profileService.getStatistics()
  }

  @IpcHandle('updateAvatar')
  public async updateAvatar(event: IpcMainEvent, avatar: string) {
    return this.profileService.updateAvatar(avatar)
  }
}