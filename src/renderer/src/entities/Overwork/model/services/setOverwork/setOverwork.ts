import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'
import { Overwork } from '../../types/overwork'

export const setOverwork = createAsyncThunk<Overwork, Overwork, ThunkConfig<string>>(
  'setOverwork',
  async (newOverworkValues, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('setOverworkTime', newOverworkValues)

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
