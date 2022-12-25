import { dataSource } from '../../config/db'
import { Workday } from '../entities/workday.entity'
import { WorkdayControllerDTO } from '../controllers/workday.controller'
import { Employee } from '../entities/employee.entity'

const workdayRepository = dataSource.getRepository(Workday)
const employeeRepository = dataSource.getRepository(Employee)

export const getWorkday = async (date: string) => {
  try {
    const workday = await workdayRepository.find({ where: { date }, relations: { employee: true } })
    // Если для этого дня еще нет записей, то создаем их для каждого сотрудника с атрибутом по умолчанию (onWork)
    if (!workday.length) {
      // const employeesWithData = await employeeRepository.find({ where: { workdays: { date } } })
      // const employeesWithoutData = employees.filter(
      //   (employee) => employeesWithData.findIndex((empl) => empl.id === employee.id) === -1
      // )
      const employees = await employeeRepository.find()

      for await (const employee of employees) {
        const employeeWorkday = await workdayRepository.findOne({
          where: { employee: { id: employee.id }, date }
        })

        if (!employeeWorkday) {
          const newEmployeeWorkday = await workdayRepository.create({
            employee,
            attribute: 'onWork',
            date
          })
          await workdayRepository.save(newEmployeeWorkday)
        }
      }
      return await workdayRepository.find({ where: { date }, relations: { employee: true } })
    }

    return workday
  } catch (e) {
    console.log(e)
    return
  }
}

export const setWorkday = async (data: WorkdayControllerDTO) => {
  try {
    const employee = await employeeRepository.findOne({
      where: { id: data.employeeId }
    })

    if (employee) {
      const employeeWorkday = await workdayRepository.findOne({
        where: { date: data.date, employee },
        relations: { employee: true }
      })

      if (employeeWorkday) {
        employeeWorkday.attribute = data.attribute
        await workdayRepository.save(employeeWorkday)
      } else {
        const newEmployeeWorkday = await workdayRepository.create({ employee, ...data })
        await workdayRepository.save(newEmployeeWorkday)
        return await workdayRepository.findOne({
          where: { date: data.date, employee },
          relations: { employee: true }
        })
      }
      return employeeWorkday
    } else {
      return { message: `Сотрудник в id ${data.employeeId} не найден` }
    }
  } catch (e) {
    console.log(e)
    return
  }
}
