import { dataSource } from '../../config/db'
import { Employee } from '../entities/employee.entity'
import { EmployeeDTO, UpdateEmployeeDTO } from '../controllers/employee.controller'

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
    const newEmployee = await employeeRepository.create({ ...employee, timeOffset: 0 })
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

export const updateEmployee = async (updateEmployeeData: UpdateEmployeeDTO) => {
  const { id, ...restData } = updateEmployeeData
  try {
    const employee = await employeeRepository.findOne({ where: { id } })
    if (employee) {
      await employeeRepository.update(updateEmployeeData.id, restData)
      return updateEmployeeData
    } else {
      console.log(`Сотрудник с id ${id} не найден`)
      return
    }
  } catch (e) {
    console.log(e)
    return
  }
}
