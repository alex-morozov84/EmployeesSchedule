import { Layout } from '@renderer/shared/ui/Layout'
import { ShowWorkday } from '@renderer/features/ShowWorkday'

export const WorkDayPage = () => {
  return (
    <Layout title="Рабочий день">
      <ShowWorkday />
    </Layout>
  )
}
