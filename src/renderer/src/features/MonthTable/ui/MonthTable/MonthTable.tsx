import { Widget } from '@renderer/shared/ui/Widget'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchEmployees, useEmployees } from '@renderer/entities/Employee'
import { ColumnsType } from 'antd/es/table'
import { dayjsMonth, daysInMonth } from '@renderer/shared/const/dayjs'
import { Checkbox, Table } from 'antd'
import { Employee } from '@renderer/entities/Employee'
import { SaveToExcel } from '@renderer/features/SaveToExcel'
import cls from './MonthTable.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { WeekDay } from '@renderer/entities/Workday/model/types/workday'
import dayjs from 'dayjs'
import { dayjsWeekDay } from '@renderer/shared/const/dayjs'
import { ChangeAttributes } from '../ChangeAttributes/ChangeAttributes'
import { useUser } from '@renderer/entities/User'

interface MonthTableProps {
  dateString: string
}

interface TableDataType {
  name: string
  key: number
  [day: number]: string
}

const attrMapper = {
  onWork: 'Р',
  watch: 'Д',
  vacation: 'Отп',
  disease: 'Б',
  dayOff: 'Отг'
}

const attrColorMapper = {
  Отг: '#dc4b4b',
  Р: '#55af55',
  Д: '#fd5a00',
  Отп: '#7575d5',
  Б: 'violet'
}

export interface ChangeAttributeData {
  employeeId: number
  date: string
  weekDay: WeekDay
}

export const MonthTable = ({ dateString }: MonthTableProps) => {
  const user = useUser()
  const dispatch = useAppDispatch()
  const employees = useEmployees()
  const tableRef = useRef(null)

  const [checkboxes, setCheckboxes] = useState(false)
  const [checkedData, setCheckedData] = useState<ChangeAttributeData[]>([])

  const splittedDateString = dateString.split('-')
  const month = splittedDateString[1]
  const year = splittedDateString[0]

  useEffect(() => {
    dispatch(fetchEmployees('all'))
  }, [dispatch])

  const days: string[] = []
  for (let i = 0; i < daysInMonth[month]; i++) {
    if (i < 9) {
      days.push(`0${i + 1}`)
    } else {
      days.push((i + 1).toString())
    }
  }

  const onChangeData = useCallback(
    (day: string, employeeMonthData: TableDataType, e: CheckboxChangeEvent) => {
      const checked = e.target.checked
      const date = `${day}.${month}.${year}`
      const employeeId = employeeMonthData.key
      const weekDay = dayjsWeekDay[dayjs(`${year}-${month}-${day}`).weekday()]
      if (checked) {
        setCheckedData([...checkedData, { date, employeeId, weekDay }])
      }
    },
    [checkedData, month, year]
  )

  const columns: ColumnsType<TableDataType> = useMemo(
    () => [
      { title: 'ФИО', dataIndex: 'name', key: 'name', ellipsis: true, width: '150px' },
      ...days.map((day) => ({
        title: day,
        dataIndex: day,
        key: day,
        render: (value, employee) => (
          <>
            <div
              style={{
                background: attrColorMapper[value],
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {checkboxes ? <Checkbox onChange={(e) => onChangeData(day, employee, e)} /> : value}
            </div>
          </>
        )
      }))
    ],
    [checkboxes, days, onChangeData]
  )

  const employeeDays = useCallback(
    (employee: Employee) =>
      days?.map((day) => {
        const attr = employee?.workdays?.find(
          (d) => d.date === `${day}.${month}.${year}`
        )?.attribute
        return {
          [day]: attr ? attrMapper[attr] : ''
        }
      }),
    [days, month, year]
  )

  const data: TableDataType[] = useMemo(
    () =>
      employees.map((employee) => ({
        name: employee.name,
        key: employee.id,
        // @ts-ignore Пока не понял как с этим бороться
        ...Object.assign(...employeeDays(employee))
      })),
    [employeeDays, employees]
  )

  return (
    <Widget title={`${dayjsMonth[month]} ${year} `}>
      <div className={classNames(cls.header)}>
        <SaveToExcel
          tableRef={tableRef}
          filename={dateString}
        />
      </div>
      <Table
        id="monthTable"
        size="small"
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        ref={tableRef}
      />
      {user?.id && (
        <ChangeAttributes
          setCheckboxes={setCheckboxes}
          checkboxes={checkboxes}
          checkedData={checkedData}
          setCheckedData={setCheckedData}
        />
      )}
    </Widget>
  )
}
