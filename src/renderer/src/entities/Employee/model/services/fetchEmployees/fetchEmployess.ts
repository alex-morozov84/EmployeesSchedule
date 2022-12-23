import { Employee } from '../../types/employee'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'

export const fetchEmployees = createAsyncThunk<Employee[], void, ThunkConfig<string>>(
  'fetchEmployee',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('getEmployees')

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
