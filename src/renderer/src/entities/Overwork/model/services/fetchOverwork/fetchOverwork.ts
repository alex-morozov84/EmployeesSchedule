import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'
import { Overwork } from '../../types/overwork'

export const fetchOverwork = createAsyncThunk<Overwork, void, ThunkConfig<string>>(
  'fetchOverwork',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('getOverworkTime')

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
