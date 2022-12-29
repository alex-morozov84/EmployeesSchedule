import { Employee } from '@renderer/entities/Employee'
import { useOverwork } from '@renderer/entities/Overwork'
import cls from './TotalHouts.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { useEffect, useMemo } from 'react'
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchOverwork } from '../../../../entities/Overwork'

interface TotalHoursProps {
  employee: Employee
}

export const TotalHours = ({ employee }: TotalHoursProps) => {
  const dispatch = useAppDispatch()
  const overwork = useOverwork()

  useEffect(() => {
    dispatch(fetchOverwork())
    // eslint-disable-next-line
  }, [])

  const totalWorkdaysHours =
    useMemo(
      () =>
        employee.workdays?.reduce((acc, day) => {
          if (day.attribute === 'watch') {
            return acc + overwork[day.weekDay]
          }
          if (day.attribute === 'dayOff') {
            return acc - 8
          }
          return acc
        }, employee.timeOffset),
      [employee.timeOffset, employee.workdays, overwork]
    ) || 0

  return (
    <div className={classNames(cls.total)}>
      Итого:
      <div className={classNames(totalWorkdaysHours >= 0 ? cls.plus : cls.minus)}>
        {totalWorkdaysHours}
      </div>
      ч
    </div>
  )
}
