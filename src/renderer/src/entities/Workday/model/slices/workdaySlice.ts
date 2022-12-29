import { WorkdaySchema } from '../types/workday'
import { buildSlice } from '../../../../shared/store'
import { fetchWorkday } from '../services/fetchWorkday/fetchWorkday'
import { setWorkday } from '../services/setWorkday/setWorkday'
import { createWorkday } from '../services/createWorkday/createWorkday'

const initialState: WorkdaySchema = {
  workday: [],
  error: undefined,
  isLoading: false
}

export const workdaySlice = buildSlice({
  name: 'workday',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkday.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(fetchWorkday.fulfilled, (state, action) => {
      state.workday = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchWorkday.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
    builder.addCase(setWorkday.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(setWorkday.fulfilled, (state, action) => {
      state.workday = state.workday.map((day) => {
        if (day.id === action.payload.id) {
          return action.payload
        }
        return day
      })
      state.isLoading = false
    })
    builder.addCase(setWorkday.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
    builder.addCase(createWorkday.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(createWorkday.fulfilled, (state, action) => {
      state.workday = action.payload
      state.isLoading = false
    })
    builder.addCase(createWorkday.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  }
})

export const {
  actions: workdayActions,
  reducer: workdayReducer,
  useActions: useWorkdayActions
} = workdaySlice
