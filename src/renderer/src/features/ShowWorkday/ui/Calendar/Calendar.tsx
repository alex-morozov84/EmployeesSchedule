import React, { useCallback } from 'react'
import { Dayjs } from 'dayjs'
import { Calendar as AntdCalendar } from 'antd'
import cls from './Calendar.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'

interface CalendarProps {
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

export const Calendar = ({ setDate }: CalendarProps) => {
  const onDaySelect = useCallback(
    (date: Dayjs) => {
      setDate(date)
    },
    [setDate]
  )

  return (
    <AntdCalendar
      fullscreen={false}
      onSelect={onDaySelect}
      className={classNames(cls.Calendar)}
    />
  )
}
