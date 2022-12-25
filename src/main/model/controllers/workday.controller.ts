import { ipcMain } from 'electron'
import { getWorkday, setWorkday } from '../services/workday.services'

export interface WorkdayControllerDTO {
  date: string
  employeeId: number
  attribute: 'onWork' | 'disease' | 'watch' | 'vacation' | 'dayOff'
}

export const workdayController = () => {
  ipcMain.handle('getWorkday', async (_, date: string) => {
    return await getWorkday(date)
  })

  ipcMain.handle('setWorkday', async (_, data: WorkdayControllerDTO) => {
    return await setWorkday(data)
  })
}
