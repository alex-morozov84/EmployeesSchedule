import { Employee } from '../../types/employee'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'

export const deleteEmployee = createAsyncThunk<Employee, number, ThunkConfig<string>>(
  'deleteEmployee',
  async (employeeId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const { ipcRenderer } = window.electron
    try {
      const response = await ipcRenderer.invoke('deleteEmployee', employeeId)

      if (!response) {
        return
      }

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('Не удалось удалить сотрудника')
    }
  }
)
