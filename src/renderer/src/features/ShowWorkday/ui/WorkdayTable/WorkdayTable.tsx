import { Widget } from '@renderer/shared/ui/Widget'
import { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Checkbox, Table } from 'antd'
import { useWorkday } from '@renderer/entities/Workday'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchWorkday, setWorkday } from '@renderer/entities/Workday'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface WorkdayTableProps {
  date: Dayjs
}

interface TableDataType {
  employeeId: number
  name: string
  onWork: boolean
  disease: boolean
  watch: boolean
  vacation: boolean
  dayOff: boolean
}

const workdayAttributes = [
  { onWork: 'На работе' },
  { disease: 'Больничный' },
  { watch: 'Дежурство' },
  { vacation: 'Отпуск' },
  { dayOff: 'Отгул' }
]

export const WorkdayTable = ({ date }: WorkdayTableProps) => {
  const workday = useWorkday()
  const dispatch = useAppDispatch()
  const formattedDate = date.format('DD.MM.YYYY')
  console.log(workday)

  useEffect(() => {
    dispatch(fetchWorkday(formattedDate))
    // eslint-disable-next-line
  }, [date])

  const onChangeAttribute = (record: TableDataType, e: CheckboxChangeEvent) => {
    const { checked, value: attribute } = e.target
    const employeeId = +record.employeeId
    if (checked) {
      dispatch(setWorkday({ date: formattedDate, employeeId, attribute }))
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
        <Checkbox
          value={`${Object.keys(attribute)[0]}`}
          checked={value}
          onChange={(e) => onChangeAttribute(record, e)}
        />
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
    dayOff: day.attribute === 'dayOff'
  }))

  return (
    <Widget title={formattedDate}>
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="uid"
      />
    </Widget>
  )
}
