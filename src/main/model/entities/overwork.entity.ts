import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Overwork {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  weekDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

  @Column({ default: 0, type: 'real' })
  overworkTime: number
}
