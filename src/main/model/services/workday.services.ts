import { dataSource } from '../../config/db'
import { Workday } from '../entities/workday.entity'
import { CreateWorkdayDTO, WorkdayControllerDTO } from '../controllers/workday.controller'
import { Employee } from '../entities/employee.entity'

const workdayRepository = dataSource.getRepository(Workday)
const employeeRepository = dataSource.getRepository(Employee)

export const getWorkday = async (date: string) => {
  try {
    return await workdayRepository.find({ where: { date }, relations: { employee: true } })
  } catch (e) {
    console.log(e)
    return
  }
}

export const setWorkday = async (data: WorkdayControllerDTO) => {
  console.log(data)
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
        employeeWorkday.weekDay = data.weekDay
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

export const createWorkday = async (data: CreateWorkdayDTO) => {
  try {
    // Среди всех сотрудников ищем тех, у кого нет записи для данной даты. Для них проставляем атрибут по умолчанию onWork
    const employees = await employeeRepository.find()

    for await (const employee of employees) {
      const employeeWorkday = await workdayRepository.findOne({
        where: { employee: { id: employee.id }, date: data.date }
      })

      if (!employeeWorkday) {
        const newEmployeeWorkday = await workdayRepository.create({
          employee,
          attribute: 'onWork',
          ...data
        })
        await workdayRepository.save(newEmployeeWorkday)
      }
    }
    return await workdayRepository.find({
      where: { date: data.date },
      relations: { employee: true }
    })
  } catch (e) {
    console.log(e)
    return
  }
}
