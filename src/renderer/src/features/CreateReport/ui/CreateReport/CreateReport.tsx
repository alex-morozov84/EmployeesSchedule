import { Employee } from '@renderer/entities/Employee'
import { Dayjs } from 'dayjs'
import { Widget } from '@renderer/shared/ui/Widget'
import { DayOff } from '../DayOff/DayOff'
import cls from './CreateReport.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'

interface CreateReportProps {
  employee: Employee
  date: Dayjs
}

export const CreateReport = ({ employee, date }: CreateReportProps) => {
  const noData = !employee.rank || !employee.position

  const noDataMessage = (
    <div className={classNames(cls.noData)}>
      <div>Не хватает следующих данных для сотрудника:</div>
      <div>{!employee.rank ? '- звание' : ''}</div>
      <div>{!employee.position ? '- должность' : ''}</div>
    </div>
  )

  return (
    <Widget title="Формирование рапорта">
      {noData ? (
        noDataMessage
      ) : (
        <DayOff
          employee={employee}
          date={date}
        />
      )}
    </Widget>
  )
}
