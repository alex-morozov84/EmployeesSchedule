import { createAsyncThunk } from '@reduxjs/toolkit'
import { Workday } from '../../types/workday'
import { ThunkConfig } from '../../../../../app/providers/StoreProvider'

export const fetchWorkday = createAsyncThunk<Workday[], string, ThunkConfig<string>>(
  'fetchWorkday',
  async (date, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('getWorkday', date)

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
