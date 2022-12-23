import { ipcMain } from 'electron'
import {
  addEmployee,
  changeEmployee,
  deleteEmployee,
  getEmployees
} from '../services/employee.services'

export interface EmployeeDTO {
  name: string
}

export interface ChangeEmployeeDTO {
  id: number
  name: string
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

  ipcMain.handle('changeEmployee', async (_, changeEmployeeData: ChangeEmployeeDTO) => {
    return await changeEmployee(changeEmployeeData)
  })
}
