import { Employee } from '@renderer/entities/Employee'

export type WorkdayAttribute = 'onWork' | 'disease' | 'watch' | 'vacation' | 'dayOff'

export interface Workday {
  id: number
  date: string
  employee: Employee
  attribute: WorkdayAttribute
}

export interface WorkdaySchema {
  workday: Workday[]
  error?: string
  isLoading: boolean
}
