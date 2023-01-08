import { Employee } from '@renderer/entities/Employee'
import { Button, DatePicker, Form, Input } from 'antd'
import { useMemo } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { updateEmployee } from '@renderer/entities/Employee/model/services/updateEmployee/updateEmployee'
import dayjs, { Dayjs } from 'dayjs'

interface EmployeeFormProps {
  employee: Employee
}

export interface UpdateEmployeeFormData {
  name?: string
  rank?: string
  position?: string
  birthDay?: Dayjs
  timeOffset?: number
}

export const EmployeeFrom = ({ employee }: EmployeeFormProps) => {
  const dispatch = useAppDispatch()
  console.log(employee)

  const onChangeEmployeeData = (fieldsValue: UpdateEmployeeFormData) => {
    const updatedEmployeeData = {
      ...fieldsValue,
      id: employee.id,
      birthDay: fieldsValue.birthDay?.format('DD.MM.YYYY')
    }

    dispatch(updateEmployee(updatedEmployeeData))
  }

  const initialData = useMemo(() => {
    return [
      { name: ['name'], value: employee.name },
      { name: ['rank'], value: employee.rank },
      { name: ['position'], value: employee.position },
      {
        name: ['birthDay'],
        value: employee.birthDay ? dayjs(employee.birthDay, 'DD.MM.YYYY') : dayjs()
      },
      { name: ['timeOffset'], value: employee.timeOffset }
    ]
  }, [employee.birthDay, employee.name, employee.position, employee.rank, employee.timeOffset])

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
        label="Звание"
        name="rank"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Должность"
        name="position"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthDay"
        label="Дата рождения"
      >
        <DatePicker />
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
