import { useEmployees, fetchEmployees, Employee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback, useEffect, useState } from 'react'
import { List } from 'antd'
import cls from './EmployeesList.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Widget } from '@renderer/shared/ui/Widget'
import { ChangeEmployeeData } from '../ChangeEmployeeData/ChangeEmployeeData'
import { EmployeesListItem } from '../EmployeesListItem/EmployeesListItem'

export const EmployeesList = () => {
  const dispatch = useAppDispatch()
  const employees = useEmployees()
  const [employeeDrawerOpen, setEmployeeDrawerOpen] = useState(false)
  const [employee, setEmployee] = useState<Employee>({} as Employee)

  useEffect(() => {
    dispatch(fetchEmployees('all'))
  }, [dispatch])

  const onCloseEmployeeDrawer = useCallback(() => {
    setEmployeeDrawerOpen(false)
  }, [])

  const renderItem = useCallback(
    (item: Employee) => (
      <EmployeesListItem
        employee={item}
        setEmployee={setEmployee}
        setEmployeeDrawerOpen={setEmployeeDrawerOpen}
      />
    ),
    []
  )

  return (
    <Widget title="Список сотрудников">
      <List
        size="small"
        className={classNames(cls.List)}
        bordered
        dataSource={employees}
        renderItem={renderItem}
      />
      <ChangeEmployeeData
        open={employeeDrawerOpen}
        close={onCloseEmployeeDrawer}
        employee={employee}
      />
    </Widget>
  )
}
