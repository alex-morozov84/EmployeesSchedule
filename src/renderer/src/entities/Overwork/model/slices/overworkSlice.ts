import { OverworkSchema } from '../types/overwork'
import { buildSlice } from '../../../../shared/store'
import { fetchOverwork } from '../services/fetchOverwork/fetchOverwork'

const initialState: OverworkSchema = {
  overwork: {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
  },
  error: undefined,
  isLoading: false
}

export const overworkSlice = buildSlice({
  name: 'overwork',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOverwork.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(fetchOverwork.fulfilled, (state, action) => {
      state.overwork = { ...state.overwork, ...action.payload }
      state.isLoading = false
    })
    builder.addCase(fetchOverwork.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  }
})

export const {
  actions: overworkActions,
  reducer: overworkReducer,
  useActions: useOverworkActions
} = overworkSlice
