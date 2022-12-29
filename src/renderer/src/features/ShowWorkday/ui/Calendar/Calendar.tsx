import React, { useCallback, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Calendar as AntdCalendar } from 'antd'
import weekday from 'dayjs/plugin/weekday'
import cls from './Calendar.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { createWorkday } from '@renderer/entities/Workday'
import { WeekDay } from '@renderer/entities/Workday/model/types/workday'
import { dayjsWeekDay } from '@renderer/shared/const/dayjs'

interface CalendarProps {
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>
  setWeekDay: React.Dispatch<React.SetStateAction<WeekDay>>
}

export const Calendar = ({ setDate, setWeekDay }: CalendarProps) => {
  dayjs.extend(weekday)
  const dispatch = useAppDispatch()

  // При монтировании компонента создаем для каждого пользователя запись с атрибутом onWork (если записи для этого пользователя и даты еще нет)
  useEffect(() => {
    dispatch(
      createWorkday({
        date: dayjs().format('DD.MM.YYYY'),
        weekDay: dayjsWeekDay[dayjs().weekday()]
      })
    )
    // eslint-disable-next-line
  }, [])

  const onDaySelect = useCallback(
    (date: Dayjs) => {
      const weekDay = dayjsWeekDay[date.weekday()]
      dispatch(createWorkday({ date: date.format('DD.MM.YYYY'), weekDay }))
      setDate(date)
      setWeekDay(weekDay)
    },
    [dispatch, setDate, setWeekDay]
  )

  return (
    <AntdCalendar
      fullscreen={false}
      onSelect={onDaySelect}
      className={classNames(cls.Calendar)}
    />
  )
}
