import { ipcMain } from 'electron'
import { userLogin } from '../services/user.services'

export interface LoginDTO {
  login: string
  password: string
}

export const userController = () => {
  ipcMain.handle('login', async (_, userData: LoginDTO) => {
    return await userLogin(userData)
  })
}
