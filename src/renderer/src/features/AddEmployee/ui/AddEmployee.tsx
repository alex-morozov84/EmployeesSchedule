import { Button, DatePicker, Form, Input } from 'antd'
import { useCallback } from 'react'
import { addEmployee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Widget } from '@renderer/shared/ui/Widget'
import cls from './AddEmployee.module.scss'
import { classNames } from '../../../shared/lib/classNames/classNames'
import { Dayjs } from 'dayjs'
import { useForm } from 'antd/es/form/Form'

interface NewEmployeeFormData {
  name: string
  rank: string
  position: string
  birthDay: Dayjs
}

export const AddEmployee = () => {
  const dispatch = useAppDispatch()
  const [form] = useForm()

  const addNewEmployee = useCallback(
    (fieldsValue: NewEmployeeFormData) => {
      const newEmployeeData = {
        ...fieldsValue,
        birthDay: fieldsValue.birthDay.format('DD.MM.YYYY')
      }

      dispatch(addEmployee(newEmployeeData))

      form.resetFields()
    },
    [dispatch, form]
  )

  return (
    <Widget title={'Добавить сотрудника'}>
      <Form
        form={form}
        size="small"
        name="addEmployee"
        onFinish={addNewEmployee}
        className={classNames(cls.form)}
      >
        <Form.Item
          label="ФИО"
          name="name"
          rules={[{ required: true, message: 'Введите ФИО сотрудника!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Звание"
          name="rank"
          rules={[{ required: true, message: 'Введите звание сотрудника!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Должность"
          name="position"
          rules={[{ required: true, message: 'Введите должность сотрудника!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthDay"
          label="Дата рождения"
          rules={[{ required: true, message: 'Выберите дату рождения сотрудника!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Widget>
  )
}
