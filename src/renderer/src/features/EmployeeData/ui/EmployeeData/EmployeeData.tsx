import { Widget } from '@renderer/shared/ui/Widget'
import { useRef, useState } from 'react'
import { Employee } from '@renderer/entities/Employee'
import { EmployeeWorkdaysTable } from '../EmployeeWorkdaysTable/EmployeeWorkdaysTable'
import { Button, Space } from 'antd'
import cls from './EmployeeData.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { SaveToExcel } from '@renderer/features/SaveToExcel'

import { EmployeeSelect } from '@renderer/features/EmployeeSelect'

export const EmployeeData = () => {
  const tableRef = useRef(null)
  const [employee, setEmployee] = useState<Employee>({} as Employee)

  const filename = employee?.name?.replace(/\s/g, '')

  return (
    <Widget title="Данные сотрудника">
      <Space direction="vertical">
        <div className={classNames(cls.headerWrapper)}>
          <EmployeeSelect
            setEmployee={setEmployee}
            type={'withHours'}
          />
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
          />
        )}
      </Space>
    </Widget>
  )
}
