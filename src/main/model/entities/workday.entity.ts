import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Employee } from './employee.entity'

@Entity()
export class Workday {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string

  @Column()
  attribute: 'onWork' | 'disease' | 'watch' | 'vacation' | 'dayOff'

  @Column({ nullable: true })
  weekDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

  // @ManyToOne(() => Employee, (employee) => employee.workdays)
  @ManyToOne('Employee', 'workdays', { onDelete: 'CASCADE' })
  employee: Employee
}
