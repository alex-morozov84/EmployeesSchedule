import { dataSource } from '../../config/db'
import { Employee } from '../entities/employee.entity'
import { ChangeEmployeeDTO, EmployeeDTO } from '../controllers/employee.controller'

const employeeRepository = dataSource.getRepository(Employee)

export const getEmployees = async () => {
  try {
    return await employeeRepository.find()
  } catch (e) {
    console.log(e)
    return
  }
}

export const addEmployee = async (employee: EmployeeDTO) => {
  try {
    const newEmployee = await employeeRepository.create(employee)
    await employeeRepository.save(newEmployee)
    return newEmployee
  } catch (e) {
    console.log(e)
    return
  }
}

export const deleteEmployee = async (id: number) => {
  try {
    const employee = await employeeRepository.findOne({ where: { id } })
    if (employee) {
      await employeeRepository.delete(id)
      return employee
    } else {
      console.log(`Сотрудник с id ${id} не найден`)
      return
    }
  } catch (e) {
    console.log(e)
    return
  }
}

export const changeEmployee = async (changeEmployeeData: ChangeEmployeeDTO) => {
  try {
    const employee = await employeeRepository.findOne({ where: { id: changeEmployeeData.id } })
    if (employee) {
      await employeeRepository.update(changeEmployeeData.id, { name: changeEmployeeData.name })
      return { message: `Данные сотрудника ${employee.name} изменены` }
    } else {
      console.log(`Сотрудник с id ${changeEmployeeData.id} не найден`)
      return
    }
  } catch (e) {
    console.log(e)
    return
  }
}
