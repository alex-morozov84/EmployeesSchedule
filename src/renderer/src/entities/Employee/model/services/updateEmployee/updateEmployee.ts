import { Employee } from '../../types/employee'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'

interface UpdateEmployee {
  id: number
  name?: string
}

export const updateEmployee = createAsyncThunk<Employee, UpdateEmployee, ThunkConfig<string>>(
  'updateEmployee',
  async (updatedData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('updateEmployee', updatedData)

      if (!response) {
        return
      }

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('Не удалось изменить данные сотрудника')
    }
  }
)
