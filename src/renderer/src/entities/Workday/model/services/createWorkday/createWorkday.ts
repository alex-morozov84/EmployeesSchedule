import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'
import { WeekDay, Workday } from '../../types/workday'

export const createWorkday = createAsyncThunk<
  Workday[],
  { date: string; weekDay: WeekDay },
  ThunkConfig<string>
>('createWorkday', async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('createWorkday', data)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return rejectWithValue('Не удалось получить данные из БД')
  }
})
