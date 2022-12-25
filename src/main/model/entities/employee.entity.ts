import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Workday } from './workday.entity'

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  timeOffset: number

  // @OneToMany(() => Workday, (workday) => workday.employee)
  @OneToMany('Workday', 'employee')
  workdays: Workday[]
}
