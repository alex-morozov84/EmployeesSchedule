import { DataSource } from 'typeorm'
import { Post } from '../model/entities/post.entity'
import { Employee } from '../model/entities/employee.entity'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'employees_schedule.sql',
  synchronize: true,
  entities: [Post, Employee]
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
