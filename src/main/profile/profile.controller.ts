import { IpcHandle } from '@doubleshot/nest-electron'
import { Controller } from '@nestjs/common'
import { Profile } from './profile.entity'
import { ProfileService } from './profile.service'

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @IpcHandle('getProfile')
  public async getProfile() {
    return this.profileService.getProfile()
  }

  @IpcHandle('updateProfile')
  public async updateProfile(_event: unknown, profile: Partial<Profile>) {
    return this.profileService.updateProfile(profile)
  }

  @IpcHandle('getUserStatistics')
  public getStatistics() {
    return this.profileService.getStatistics()
  }

  @IpcHandle('updateAvatar')
  public async updateAvatar(_event: unknown, avatar: string) {
    return this.profileService.updateAvatar(avatar)
  }
}
