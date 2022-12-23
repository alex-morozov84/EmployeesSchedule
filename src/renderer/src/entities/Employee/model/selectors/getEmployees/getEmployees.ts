import { buildSelector } from '@renderer/shared/store'

export const [useEmployees, getEmployees] = buildSelector((state) => state.employee.employees)
