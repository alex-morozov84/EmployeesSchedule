import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../types/user'
import { ThunkConfig } from '@renderer/app/providers/StoreProvider'

export const login = createAsyncThunk<
  User,
  { login: string; password: string },
  ThunkConfig<string>
>('login', async (loginData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('login', loginData)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return rejectWithValue('Не удалось добавить сотрудника')
  }
})
