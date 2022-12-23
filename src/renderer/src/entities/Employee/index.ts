export type { EmployeeSchema, Employee } from './model/types/employee'

export { employeeActions, employeeReducer, useEmployeeActions } from './model/slices/employeeSlice'

export { useEmployees } from './model/selectors/getEmployees/getEmployees'

export { fetchEmployees } from './model/services/fetchEmployees/fetchEmployess'
export { addEmployee } from './model/services/addEmployee/addEmployee'
export { deleteEmployee } from './model/services/deleteEmployee/deleteEmployee'
