export interface Employee {
  id: number
  name: string
  timeOffset: number
}

export interface EmployeeSchema {
  employees: Employee[]
  error?: string
  isLoading: boolean
}
