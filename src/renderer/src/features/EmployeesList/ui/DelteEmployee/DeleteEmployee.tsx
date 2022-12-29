import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react'
import cls from './DelteEmployee.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Employee } from '@renderer/entities/Employee'
import { Modal } from 'antd'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteEmployee } from '@renderer/entities/Employee'

interface DeleteEmployeeProps {
  employee: Employee
}

export const DeleteEmployee = ({ employee }: DeleteEmployeeProps) => {
  const { ipcRenderer } = window.electron
  const { confirm } = Modal
  const dispatch = useAppDispatch()

  const onDeleteEmployee = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: Employee
  ) => {
    e.stopPropagation()

    const employeeHasData = await ipcRenderer.invoke('checkEmployeeWorkdaysData', item.id)
    if (employeeHasData) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: `Для сотрудника ${item.name} имеются данные в календаре. Все равно удалить?`,
        async onOk() {
          await dispatch(deleteEmployee(item.id))
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    } else {
      await dispatch(deleteEmployee(item.id))
    }
  }

  return (
    <DeleteOutlined
      className={classNames(cls.deleteIcon)}
      onClick={(e) => onDeleteEmployee(e, employee)}
      key="delete"
    />
  )
}
