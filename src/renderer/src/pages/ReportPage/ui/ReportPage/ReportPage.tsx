import { Layout } from '@renderer/shared/ui/Layout'
import { ChooseReportData } from '@renderer/features/ChooseReportData'
import { useState } from 'react'
import { Employee } from '@renderer/entities/Employee'
import { Dayjs } from 'dayjs'
import { CreateReport } from '@renderer/features/CreateReport'

export const ReportPage = () => {
  const [employee, setEmployee] = useState<Employee>({} as Employee)
  const [date, setDate] = useState<Dayjs>({} as Dayjs)

  return (
    <Layout title="Рапорта">
      <ChooseReportData
        setEmployee={setEmployee}
        setDate={setDate}
      />
      {date && employee.id && (
        <CreateReport
          date={date}
          employee={employee}
        />
      )}
    </Layout>
  )
}
