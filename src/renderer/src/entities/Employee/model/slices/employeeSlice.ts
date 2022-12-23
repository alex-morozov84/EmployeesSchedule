import { PayloadAction } from '@reduxjs/toolkit'
import { EmployeeSchema, Employee } from '../types/employee'
import { buildSlice } from '@renderer/shared/store'
import { fetchEmployees } from '../services/fetchEmployees/fetchEmployess'
import { addEmployee } from '../services/addEmployee/addEmployee'
import { deleteEmployee } from '../services/deleteEmployee/deleteEmployee'

const initialState: EmployeeSchema = {
  employees: [],
  error: undefined,
  isLoading: false
}

export const employeeSlice = buildSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = { ...state.employees, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
    builder.addCase(addEmployee.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employees = [...state.employees, action.payload]
      state.isLoading = false
    })
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
    builder.addCase(deleteEmployee.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.filter((employee) => employee.id !== action.payload.id)
      state.isLoading = false
    })
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  }
})

export const {
  actions: employeeActions,
  reducer: employeeReducer,
  useActions: useEmployeeActions
} = employeeSlice
