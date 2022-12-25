import { useEmployees, fetchEmployees, Employee, deleteEmployee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import React, { useEffect, useState } from 'react'
import { List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import cls from './EmployeesList.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Widget } from '@renderer/shared/ui/Widget'
import { ChangeEmployeeData } from '../ChangeEmployeeData/ChangeEmployeeData'

export const EmployeesList = () => {
  const dispatch = useAppDispatch()
  const employees = useEmployees()
  const [employeeDrawerOpen, setEmployeeDrawerOpen] = useState(false)
  const [employee, setEmployee] = useState<Employee>({} as Employee)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  // TODO Если есть данные, то вопрос удалять или нет
  const onDeleteEmployee = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: Employee) => {
    e.stopPropagation()
    dispatch(deleteEmployee(item.id))
  }

  const onOpenEmployeeDrawer = (item: Employee) => () => {
    setEmployeeDrawerOpen(true)
    setEmployee(item)
  }

  const onCloseEmployeeDrawer = () => {
    setEmployeeDrawerOpen(false)
  }

  return (
    <Widget title="Список сотрудников">
      <List
        size="small"
        className={classNames(cls.List)}
        bordered
        dataSource={employees}
        renderItem={(item) => (
          <List.Item
            onClick={onOpenEmployeeDrawer(item)}
            actions={[
              <DeleteOutlined
                className={classNames(cls.deleteIcon)}
                onClick={(e) => onDeleteEmployee(e, item)}
                key="delete"
              />
            ]}
            className={classNames(cls.item)}
          >
            {`${item.name} - ${item.timeOffset} часов`}
          </List.Item>
        )}
      />
      <ChangeEmployeeData
        open={employeeDrawerOpen}
        close={onCloseEmployeeDrawer}
        employee={employee}
      />
    </Widget>
  )
}
