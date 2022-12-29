import { Employee } from '../../types/employee'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'

export const fetchEmployees = createAsyncThunk<
  Employee[],
  'all' | 'withHours',
  ThunkConfig<string>
>('fetchEmployee', async (type, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('getEmployees', type)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return rejectWithValue('Не удалось получить данные из БД')
  }
})
