import { ipcMain } from 'electron'
import { getOverworkTime, setOverworkTime } from '../services/overwork.services'

export interface OverworkTimeDTO {
  monday: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  saturday: number
  sunday: number
}

export const overworkController = () => {
  ipcMain.handle('getOverworkTime', async () => {
    return await getOverworkTime()
  })

  ipcMain.handle('setOverworkTime', async (_, overworkTime: OverworkTimeDTO) => {
    return await setOverworkTime(overworkTime)
  })
}
