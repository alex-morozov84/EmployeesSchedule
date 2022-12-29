import React, { memo, useCallback } from 'react'
import { DatePicker, DatePickerProps } from 'antd'

interface MonthSelectProps {
  setDateString: React.Dispatch<React.SetStateAction<string>>
}

export const MonthSelect = memo(({ setDateString }: MonthSelectProps) => {
  const onChangeMonth: DatePickerProps['onChange'] = useCallback(
    (_, dateString) => {
      setDateString(dateString)
    },
    [setDateString]
  )

  return (
    <DatePicker
      onChange={onChangeMonth}
      picker="month"
    />
  )
})

MonthSelect.displayName = 'MonthSelect'
