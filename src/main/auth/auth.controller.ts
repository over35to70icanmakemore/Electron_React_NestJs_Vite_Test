import { IpcHandle } from '@doubleshot/nest-electron'
import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IpcHandle('login')
  public async login(data: [string, string]) {
    const [username, password] = data
    return this.authService.login(username, password)
  }

  @IpcHandle('logout')
  public async logout() {
    return this.authService.logout()
  }

  @IpcHandle('getCurrentUser')
  public async getCurrentUser() {
    return this.authService.getCurrentUser()
  }
}
