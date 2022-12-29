import { List } from 'antd'
import { Employee } from '@renderer/entities/Employee'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import React from 'react'
import cls from './EmployeesListItem.module.scss'
import { DeleteEmployee } from '../DelteEmployee/DeleteEmployee'
import { TotalHours } from '../../../TotalHours/ui/TotalHours/TotalHours'

interface EmployeesListItemProps {
  employee: Employee
  setEmployeeDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>
}

export const EmployeesListItem = ({
  employee,
  setEmployeeDrawerOpen,
  setEmployee
}: EmployeesListItemProps) => {
  const onOpenEmployeeDrawer = (employee: Employee) => () => {
    setEmployeeDrawerOpen(true)
    setEmployee(employee)
  }

  return (
    <List.Item
      onClick={onOpenEmployeeDrawer(employee)}
      actions={[
        <DeleteEmployee
          employee={employee}
          key={employee.id}
        />
      ]}
      className={classNames(cls.item)}
    >
      <div className={classNames(cls.totalHours)}>
        <div>{employee.name}</div> <TotalHours employee={employee} />
      </div>
    </List.Item>
  )
}
