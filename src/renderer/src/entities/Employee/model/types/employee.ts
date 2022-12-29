import { Workday } from '@renderer/entities/Workday'

export interface Employee {
  id: number
  name: string
  timeOffset: number
  workdays?: Workday[]
}

export interface EmployeeSchema {
  employees: Employee[]
  error?: string
  isLoading: boolean
}
