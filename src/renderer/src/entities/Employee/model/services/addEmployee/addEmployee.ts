import { Employee } from '../../types/employee'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'

export interface AddEmployeeDTO {
  name: string
  birthDay: string
  rank: string
  position: string
}

export const addEmployee = createAsyncThunk<Employee, AddEmployeeDTO, ThunkConfig<string>>(
  'addEmployee',
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('postEmployee', data)

      if (!response) {
        return
      }

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('Не удалось добавить сотрудника')
    }
  }
)
