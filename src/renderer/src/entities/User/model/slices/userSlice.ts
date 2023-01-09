import { buildSlice } from '@renderer/shared/store'
import { User, UserSchema } from '../types/user'
import { login } from '../services/login/login'

const initialState: UserSchema = {
  error: undefined,
  isLoading: false
}

export const userSlice = buildSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user')
      state.userData = {} as User
    },
    reauth: (state, action) => {
      state.userData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.userData = action.payload
      state.isLoading = false
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  }
})

export const { actions: userActions, reducer: userReducer, useActions: useUserActions } = userSlice
