import { Widget } from '@renderer/shared/ui/Widget'
import { useCallback, useRef, useState } from 'react'
import { Employee } from '@renderer/entities/Employee'
import { EmployeeWorkdaysTable } from '../EmployeeWorkdaysTable/EmployeeWorkdaysTable'
import { Space, DatePicker } from 'antd'
import cls from './EmployeeData.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { SaveToExcel } from '@renderer/features/SaveToExcel'

import { EmployeeSelect } from '@renderer/features/EmployeeSelect'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'

export const EmployeeData = () => {
  const currentYear = dayjs().year()
  const tableRef = useRef(null)
  const [employee, setEmployee] = useState<Employee>({} as Employee)
  const [dateFrom, setDateFrom] = useState<string>(`${currentYear}-01-01`)
  const [dateTo, setDateTo] = useState<string>(`${currentYear}-12-31`)

  const filename = employee?.name?.replace(/\s/g, '')

  const changeDateRange = useCallback((value: RangePickerProps['value']) => {
    const dateFrom = value?.[0]?.format('YYYY-MM-DD')
    const dateTo = value?.[1]?.format('YYYY-MM-DD')

    dateFrom && setDateFrom(dateFrom)
    dateTo && setDateTo(dateTo)
  }, [])

  return (
    <Widget title="Данные сотрудника">
      <Space direction="vertical">
        <div className={classNames(cls.headerWrapper)}>
          <Space>
            <EmployeeSelect
              setEmployee={setEmployee}
              type={'withHours'}
            />
            <DatePicker.RangePicker
              format="DD-MM-YYYY"
              // picker="month"
              onChange={changeDateRange}
              defaultValue={[dayjs(dateFrom, 'YYYY-MM-DD'), dayjs(dateTo, 'YYYY-MM-DD')]}
            />
          </Space>
          {employee.id && (
            <SaveToExcel
              tableRef={tableRef}
              filename={filename}
            />
          )}
        </div>

        {employee.id && (
          <EmployeeWorkdaysTable
            employee={employee}
            tableRef={tableRef}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        )}
      </Space>
    </Widget>
  )
}
