import { ipcMain } from 'electron'
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees
} from '../services/employee.services'

export interface EmployeeDTO {
  name: string
}

export interface UpdateEmployeeDTO {
  id: number
  name?: string
  timeOffset?: number
}

export const employeeController = () => {
  ipcMain.handle('getEmployees', async () => {
    return await getEmployees()
  })

  ipcMain.handle('postEmployee', async (_, newEmployeeData: EmployeeDTO) => {
    return await addEmployee(newEmployeeData)
  })

  ipcMain.handle('deleteEmployee', async (_m, id: number) => {
    return await deleteEmployee(id)
  })

  ipcMain.handle('updateEmployee', async (_, updateEmployeeData: UpdateEmployeeDTO) => {
    return await updateEmployee(updateEmployeeData)
  })
}
