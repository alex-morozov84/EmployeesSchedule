import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'
import { Workday, WorkdayAttribute } from '../../types/workday'

interface SetWorkdayDTO {
  date: string
  attribute: WorkdayAttribute
  employeeId: number
}

export const setWorkday = createAsyncThunk<Workday, SetWorkdayDTO, ThunkConfig<string>>(
  'setWorkday',
  async (newWorkdayData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('setWorkday', newWorkdayData)

      if (!response) {
        return
      }
      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('Не удалось получить данные из БД')
    }
  }
)
