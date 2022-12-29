import { Employee } from '@renderer/entities/Employee'

export type WorkdayAttribute = 'onWork' | 'disease' | 'watch' | 'vacation' | 'dayOff'
export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface Workday {
  id: number
  date: string
  employee: Employee
  attribute: WorkdayAttribute
  weekDay: WeekDay
}

export interface WorkdaySchema {
  workday: Workday[]
  error?: string
  isLoading: boolean
}
