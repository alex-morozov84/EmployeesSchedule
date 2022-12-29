import { dataSource } from '../../config/db'
import { Employee } from '../entities/employee.entity'
import { EmployeeDTO, UpdateEmployeeDTO } from '../controllers/employee.controller'

const employeeRepository = dataSource.getRepository(Employee)

export const getEmployees = async (type: 'all' | 'withHours') => {
  try {
    if (type === 'withHours') {
      // Получаем всех сотрудников и список дней, когда они дежурили или были в отгуле
      const employees = await employeeRepository
        .createQueryBuilder('employee')
        .leftJoinAndSelect('employee.workdays', 'workday')
        .where('workday.attribute = :attr1', { attr1: 'watch' })
        .orWhere('workday.attribute = :attr2', { attr2: 'dayOff' })
        // .orWhere('employee.timeOffset = :timeOffset', { timeOffset: '> 0' })
        .getMany()
      // return employees
      // console.log(employees)
      return employees
    } else {
      const employees = await employeeRepository.find({ relations: { workdays: true } })
      // console.log(a)
      return employees
    }
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

export const checkEmployeeWorkdaysData = async (employeeId: number) => {
  try {
    const employee = await employeeRepository.findOne({
      where: { id: employeeId },
      relations: { workdays: true }
    })

    return !!employee?.workdays.length
  } catch (e) {
    console.log(e)
    return
  }
}
