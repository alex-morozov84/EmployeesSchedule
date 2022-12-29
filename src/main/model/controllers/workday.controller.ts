import { ipcMain } from 'electron'
import { createWorkday, getWorkday, setWorkday } from '../services/workday.services'

export interface WorkdayControllerDTO {
  date: string
  weekDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  employeeId: number
  attribute: 'onWork' | 'disease' | 'watch' | 'vacation' | 'dayOff'
}

export interface CreateWorkdayDTO {
  date: string
  weekDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
}

export const workdayController = () => {
  ipcMain.handle('getWorkday', async (_, date: string) => {
    return await getWorkday(date)
  })

  ipcMain.handle('setWorkday', async (_, data: WorkdayControllerDTO) => {
    return await setWorkday(data)
  })

  ipcMain.handle('createWorkday', async (_, data: CreateWorkdayDTO) => {
    return await createWorkday(data)
  })
}
