export interface Employee {
  id: number
  name: string
}

export interface EmployeeSchema {
  employees: Employee[]
  error?: string
  isLoading: boolean
}
