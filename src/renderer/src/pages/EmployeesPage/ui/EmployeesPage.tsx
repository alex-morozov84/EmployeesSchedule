import { EmployeesList } from '@renderer/features/EmployeesList'
import { Layout } from '@renderer/shared/ui/Layout'
import { AddEmployee } from '@renderer/features/AddEmployee'

export const EmployeesPage = () => {
  return (
    <Layout title="Сотрудники">
      <EmployeesList />
      <AddEmployee />
    </Layout>
  )
}
