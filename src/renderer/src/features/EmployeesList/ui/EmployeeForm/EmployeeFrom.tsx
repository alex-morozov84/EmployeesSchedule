import { Employee } from '@renderer/entities/Employee'
import { Button, Form, Input } from 'antd'
import { useMemo } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { updateEmployee } from '@renderer/entities/Employee/model/services/updateEmployee/updateEmployee'

interface EmployeeFormProps {
  employee: Employee
}

export interface UpdateEmployeeDTO {
  name?: string
  timeOffset?: number
}

export const EmployeeFrom = ({ employee }: EmployeeFormProps) => {
  const dispatch = useAppDispatch()
  const onChangeEmployeeData = (value: UpdateEmployeeDTO) => {
    dispatch(updateEmployee({ id: employee.id, ...value }))
  }

  const initialData = useMemo(() => {
    return [
      { name: ['name'], value: employee.name },
      { name: ['timeOffset'], value: employee.timeOffset }
    ]
  }, [employee.name, employee.timeOffset])

  return (
    <Form
      layout="vertical"
      onFinish={onChangeEmployeeData}
      fields={initialData}
    >
      <Form.Item
        name="name"
        label="ФИО"
        rules={[{ required: true, message: 'Введите ФИО сотрудника!' }]}
      >
        <Input placeholder="Введите ФИО сотрудника" />
      </Form.Item>
      <Form.Item
        name="timeOffset"
        label="Остаток часов на начало года"
      >
        <Input placeholder="Введите остаток часов сотрудника" />
      </Form.Item>
      <Button
        htmlType="submit"
        type="primary"
      >
        Применить
      </Button>
    </Form>
  )
}
