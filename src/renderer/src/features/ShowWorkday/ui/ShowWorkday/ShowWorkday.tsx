import { Calendar } from '../Calendar/Calendar'
import { WorkdayTable } from '../WorkdayTable/WorkdayTable'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

export const ShowWorkday = () => {
  const [date, setDate] = useState<Dayjs>(dayjs())
  return (
    <>
      <Calendar setDate={setDate} />
      <WorkdayTable date={date} />
    </>
  )
}
