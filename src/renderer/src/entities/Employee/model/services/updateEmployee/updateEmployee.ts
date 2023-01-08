import { Employee } from '../../types/employee'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'

interface UpdateEmployeeDTO {
  id: number
  name?: string
  rank?: string
  position?: string
  birthDay?: string
  timeOffset?: number
}

export const updateEmployee = createAsyncThunk<Employee, UpdateEmployeeDTO, ThunkConfig<string>>(
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
