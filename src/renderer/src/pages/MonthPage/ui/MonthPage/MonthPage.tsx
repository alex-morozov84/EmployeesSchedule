import { Layout } from '@renderer/shared/ui/Layout'
import { MonthSelect } from '@renderer/shared/ui/MonthSelect'
import { useState } from 'react'
import { MonthTable } from '@renderer/features/MonthTable'
import dayjs from 'dayjs'

export const MonthPage = () => {
  const currentDate = dayjs().format('YYYY-MM')
  const [dateString, setDateString] = useState(currentDate)

  return (
    <Layout title="Месяц">
      <MonthSelect setDateString={setDateString} />
      {dateString && <MonthTable dateString={dateString} />}
    </Layout>
  )
}
