import { Employee } from '@renderer/entities/Employee'
import { Dayjs } from 'dayjs'
import { Widget } from '@renderer/shared/ui/Widget'
import { DayOff } from '../DayOff/DayOff'

interface CreateReportProps {
  employee: Employee
  date: Dayjs
}

export const CreateReport = ({ employee, date }: CreateReportProps) => {
  return (
    <Widget title="Формирование рапорта">
      <DayOff
        employee={employee}
        date={date}
      />
    </Widget>
  )
}
