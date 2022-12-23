import { ipcMain } from 'electron'
import { getData } from '../services/user.services'

export const getUsers = () =>
  ipcMain.handle('async-message', async () => {
    const res = await getData()
    return res
  })
