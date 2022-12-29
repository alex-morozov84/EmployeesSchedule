import { DataSource } from 'typeorm'
import { Employee } from '../model/entities/employee.entity'
import { Overwork } from '../model/entities/overwork.entity'
import { Workday } from '../model/entities/workday.entity'
import { User } from '../model/entities/user.entity'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './employees_schedule.sql',
  synchronize: true,
  entities: [Employee, Overwork, Workday, User]
})

export const connectToDb = async () => {
  try {
    await dataSource.initialize()
    console.log('Connection to database established successfully')
  } catch (e) {
    console.log(e)
    console.log('Connection to database failed')
  }
}
