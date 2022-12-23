import { useEmployees, fetchEmployees, Employee, deleteEmployee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useEffect } from 'react'
import { List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import cls from './EmployeesList.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Widget } from '@renderer/shared/ui/Widget'

export const EmployeesList = () => {
  const dispatch = useAppDispatch()
  const employees = useEmployees()

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  const onDeleteEmployee = (item: Employee) => () => {
    dispatch(deleteEmployee(item.id))
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
            actions={[
              <DeleteOutlined
                className={classNames(cls.deleteIcon)}
                onClick={onDeleteEmployee(item)}
                key="delete"
              />
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
    </Widget>
  )
}
