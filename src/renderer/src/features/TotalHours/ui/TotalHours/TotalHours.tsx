import { Employee } from '@renderer/entities/Employee'
import { useOverwork } from '@renderer/entities/Overwork'
import cls from './TotalHouts.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { useEffect } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchOverwork } from '@renderer/entities/Overwork'
import { Workday } from '@renderer/entities/Workday'
import dayjs from 'dayjs'
import { Badge, Card, Statistic } from 'antd'

interface TotalHoursProps {
  employee: Employee
  employeeWorkdaysRange?: Workday[]
  year?: boolean
}

export const TotalHours = ({ employee, employeeWorkdaysRange, year }: TotalHoursProps) => {
  const currentYear = dayjs().year()
  const dispatch = useAppDispatch()
  const overwork = useOverwork()

  // Фильтрация по текущему году
  const employeeWorkdaysRangeCurrentYear = [
    ...(employee.workdays?.filter(
      (day) =>
        dayjs(day.date, 'DD.MM.YYYY').diff(dayjs(`${currentYear}-01-01`, 'YYYY-MM-DD')) >= 0 &&
        dayjs(day.date, 'DD.MM.YYYY').diff(dayjs(`${currentYear}-12-31`, 'YYYY-MM-DD')) <= 0
    ) || [])
  ]

  useEffect(() => {
    dispatch(fetchOverwork())
    // eslint-disable-next-line
  }, [])

  const countTotalHours = (workdays?: Workday[]) => {
    return (
      workdays?.reduce((acc, day) => {
        if (day.attribute === 'watch') {
          return acc + overwork[day.weekDay]
        }
        if (day.attribute === 'dayOff') {
          return acc - 8
        }
        return acc
      }, +employee.timeOffset) || 0
    )
  }

  // Часы за все время
  const totalWorkdaysHours = countTotalHours(employee.workdays)

  // Часы за текущий год
  const totalWorkdaysHoursCurrentYear = countTotalHours(employeeWorkdaysRangeCurrentYear)

  // Часы за выбранный диапазон
  const totalWorkdaysHoursInCurrentRange = countTotalHours(employeeWorkdaysRange)

  return (
    <>
      {year ? (
        <Badge
          className="site-badge-count-109"
          count={totalWorkdaysHoursCurrentYear}
          style={{ backgroundColor: totalWorkdaysHoursCurrentYear > 0 ? '#3f8600' : '#cf1322' }}
        />
      ) : (
        <div className={classNames(cls.total)}>
          <Card size="small">
            <Statistic
              title="За текущий год"
              value={totalWorkdaysHoursCurrentYear}
              precision={1}
              valueStyle={{ color: totalWorkdaysHoursCurrentYear > 0 ? '#3f8600' : '#cf1322' }}
              suffix="ч"
            />
          </Card>

          {employeeWorkdaysRange && (
            <>
              <Card size="small">
                <Statistic
                  title="На начало года"
                  value={employee.timeOffset}
                  precision={1}
                  valueStyle={{ color: employee.timeOffset > 0 ? '#3f8600' : '#cf1322' }}
                  suffix="ч"
                />
              </Card>
              <Card size="small">
                <Statistic
                  title="За все время"
                  value={totalWorkdaysHours}
                  precision={1}
                  valueStyle={{ color: totalWorkdaysHours > 0 ? '#3f8600' : '#cf1322' }}
                  suffix="ч"
                />
              </Card>
              <Card size="small">
                <Statistic
                  title="За выбранный период"
                  value={totalWorkdaysHoursInCurrentRange}
                  precision={1}
                  valueStyle={{
                    color: totalWorkdaysHoursInCurrentRange > 0 ? '#3f8600' : '#cf1322'
                  }}
                  suffix="ч"
                />
              </Card>
            </>
          )}
        </div>
      )}
    </>
  )
}
