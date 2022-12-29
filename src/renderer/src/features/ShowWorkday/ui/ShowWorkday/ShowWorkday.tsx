import { Calendar } from '../Calendar/Calendar'
import { WorkdayTable } from '../WorkdayTable/WorkdayTable'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { WeekDay } from '@renderer/entities/Workday/model/types/workday'

export const ShowWorkday = () => {
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [weekDay, setWeekDay] = useState<WeekDay>('monday')

  return (
    <>
      <Calendar
        setDate={setDate}
        setWeekDay={setWeekDay}
      />
      <WorkdayTable
        weekDay={weekDay}
        date={date}
      />
    </>
  )
}
