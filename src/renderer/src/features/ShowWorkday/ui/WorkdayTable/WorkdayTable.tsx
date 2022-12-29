import { Widget } from '@renderer/shared/ui/Widget'
import { Dayjs } from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import { Checkbox, Table } from 'antd'
import { setWorkday, useWorkday } from '@renderer/entities/Workday'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { WeekDay } from '@renderer/entities/Workday/model/types/workday'
import { SaveToExcel } from '@renderer/features/SaveToExcel'
import { useRef } from 'react'
import cls from './WorkdayTable.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'

interface WorkdayTableProps {
  date: Dayjs
  weekDay: WeekDay
}

interface TableDataType {
  employeeId: number
  name: string
  onWork: boolean
  disease: boolean
  watch: boolean
  vacation: boolean
  dayOff: boolean
  key: string
}

const workdayAttributes = [
  { onWork: 'На работе' },
  { disease: 'Больничный' },
  { watch: 'Дежурство' },
  { vacation: 'Отпуск' },
  { dayOff: 'Отгул' }
]

export const WorkdayTable = ({ date, weekDay }: WorkdayTableProps) => {
  const tableRef = useRef(null)
  const workday = useWorkday()
  const dispatch = useAppDispatch()
  const formattedDate = date.format('DD.MM.YYYY')

  const onChangeAttribute = (record: TableDataType, e: CheckboxChangeEvent) => {
    const { checked, value: attribute } = e.target
    const employeeId = +record.employeeId
    if (checked) {
      dispatch(setWorkday({ date: formattedDate, weekDay, employeeId, attribute }))
    }
  }

  const columns: ColumnsType<TableDataType> = [
    { title: 'ФИО', dataIndex: 'name', key: 'name', ellipsis: true },
    ...workdayAttributes.map((attribute) => ({
      title: `${Object.values(attribute)[0]}`,
      dataIndex: `${Object.keys(attribute)[0]}`,
      key: `${Object.keys(attribute)[0]}`,
      ellipsis: true,
      render: (value, record) => (
        <>
          {/*Невидимые плюсы для экспорта в Excel*/}
          <div style={{ display: 'none' }}>{value ? '+' : ''}</div>
          <Checkbox
            value={`${Object.keys(attribute)[0]}`}
            checked={value}
            onChange={(e) => onChangeAttribute(record, e)}
          />
        </>
      )
    }))
  ]

  const data: TableDataType[] = workday.map((day) => ({
    employeeId: day.employee.id,
    name: day.employee.name,
    onWork: day.attribute === 'onWork',
    disease: day.attribute === 'disease',
    watch: day.attribute === 'watch',
    vacation: day.attribute === 'vacation',
    dayOff: day.attribute === 'dayOff',
    key: day.id.toString()
  }))

  return (
    <Widget title={formattedDate}>
      <div className={classNames(cls.header)}>
        <SaveToExcel
          tableRef={tableRef}
          filename={formattedDate}
        />
      </div>
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        // rowKey="uid"
        ref={tableRef}
      />
    </Widget>
  )
}
