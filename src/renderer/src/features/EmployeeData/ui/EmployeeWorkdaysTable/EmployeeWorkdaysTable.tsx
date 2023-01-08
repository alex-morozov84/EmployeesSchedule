import { Employee } from '@renderer/entities/Employee'
import { fetchOverwork, useOverwork } from '@renderer/entities/Overwork'
import React, { useEffect } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import { weedDaysTranslate } from '@renderer/shared/const/weekDays'
import { workdayAttributesTranslate } from '@renderer/shared/const/workdayAttributes'
import { TotalHours } from '@renderer/features/TotalHours'
import cls from './EmployeeWorkdaysTable.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import dayjs from 'dayjs'

interface EmployeeWorkdaysTableProps {
  employee: Employee
  tableRef: React.MutableRefObject<null>
  dateFrom: string
  dateTo: string
}

interface TableDataType {
  date: string
  weekDay: string
  attribute: string
  hours: number
  key: string
}

export const EmployeeWorkdaysTable = ({
  employee,
  tableRef,
  dateFrom,
  dateTo
}: EmployeeWorkdaysTableProps) => {
  const dispatch = useAppDispatch()
  const overwork = useOverwork()

  useEffect(() => {
    dispatch(fetchOverwork())
    // eslint-disable-next-line
  }, [])

  // Фильтрация по выбранному диапазону дат
  const employeeWorkdaysRange = [
    ...(employee.workdays?.filter(
      (day) =>
        dayjs(day.date, 'DD.MM.YYYY').diff(dayjs(dateFrom, 'YYYY-MM-DD')) >= 0 &&
        dayjs(day.date, 'DD.MM.YYYY').diff(dayjs(dateTo, 'YYYY-MM-DD')) <= 0
    ) || [])
  ]

  // const employeeWorkdays = [...(employee?.workdays || [])]

  // Сортировка по дате. Т.к. дата задана в российском формате, то вначале переворачиваем ее
  const getTimestamp = (str) => +new Date(str.split('.').reverse())
  const sortedDates = employeeWorkdaysRange.sort(
    (a, b) => getTimestamp(a.date) - getTimestamp(b.date)
  )

  const columns: ColumnsType<TableDataType> = [
    { title: 'Дата', dataIndex: 'date', key: 'date', ellipsis: true },
    { title: 'День недели', dataIndex: 'weekDay', key: 'weekDay', ellipsis: true },
    { title: 'Атрибут', dataIndex: 'attribute', key: 'attribute', ellipsis: true },
    {
      title: 'Часы',
      dataIndex: 'hours',
      key: 'hours',
      ellipsis: true,
      render: (value, record) => (
        <div style={{ color: record.attribute === 'Дежурство' ? 'blue' : 'red' }}>
          {record.attribute === 'Дежурство' ? value : -8}
        </div>
      )
    }
  ]

  const data: TableDataType[] = sortedDates.map((day) => ({
    date: day.date,
    weekDay: weedDaysTranslate[day.weekDay],
    attribute: workdayAttributesTranslate[day.attribute],
    hours: overwork[day.weekDay],
    key: day.date
  }))

  return (
    <div className={classNames(cls.wrapper)}>
      {data.length > 0 ? (
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
          ref={tableRef}
        />
      ) : (
        <div className={classNames(cls.noData)}>
          За выбранный период нет данных о полученных/потраченных часах
        </div>
      )}
      <TotalHours
        employee={employee}
        employeeWorkdaysRange={employeeWorkdaysRange}
      />
    </div>
  )
}
