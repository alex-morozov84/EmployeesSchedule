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

interface EmployeeWorkdaysTableProps {
  employee: Employee
  tableRef: React.MutableRefObject<null>
}

interface TableDataType {
  date: string
  weekDay: string
  attribute: string
  hours: number
  key: string
}

export const EmployeeWorkdaysTable = ({ employee, tableRef }: EmployeeWorkdaysTableProps) => {
  const dispatch = useAppDispatch()
  const overwork = useOverwork()

  useEffect(() => {
    dispatch(fetchOverwork())
    // eslint-disable-next-line
  }, [])

  const employeeWorkdays = [...(employee?.workdays || [])]

  // Сортировка по дате. Т.к. дата задана в российском формате, то вначале переворачиваем ее
  const getTimestamp = (str) => +new Date(str.split('.').reverse())
  const sortedDates = employeeWorkdays.sort((a, b) => getTimestamp(a.date) - getTimestamp(b.date))

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
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        // rowKey="uid"
        ref={tableRef}
      />
      <TotalHours employee={employee} />
    </div>
  )
}
