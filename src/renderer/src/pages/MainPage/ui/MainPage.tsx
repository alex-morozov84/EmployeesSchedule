import { Layout } from '@renderer/shared/ui/Layout'
import { EmployeeData } from '@renderer/features/EmployeeData'

export const MainPage = () => {
  return (
    <Layout title="Главная">
      <EmployeeData />
    </Layout>
  )
}
