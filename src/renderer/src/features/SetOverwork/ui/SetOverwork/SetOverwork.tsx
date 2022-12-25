import { Widget } from '@renderer/shared/ui/Widget'
import { Button, Form, InputNumber } from 'antd'
import { Overwork } from '@renderer/entities/Overwork'
import { useOverwork } from '@renderer/entities/Overwork'
import { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchOverwork } from '@renderer/entities/Overwork'
import { setOverwork } from '@renderer/entities/Overwork'

const weekDays = [
  { monday: 'Понедельник' },
  { tuesday: 'Вторник' },
  { wednesday: 'Среда' },
  { thursday: 'Четверг' },
  { friday: 'Пятница' },
  { saturday: 'Суббота' },
  { sunday: 'Воскресенье' }
]

export const SetOverwork = () => {
  const overworkTime = useOverwork()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOverwork())
    //eslint-disable-next-line
  }, [])

  const setOverworkTime = useCallback(
    (value: Overwork) => {
      dispatch(setOverwork(value))
    },
    [dispatch]
  )

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 18 }
  }

  const initialData = useMemo(() => {
    return weekDays.map((day) => ({
      name: [`${Object.keys(day)[0]}`],
      value: overworkTime[Object.keys(day)[0]]
    }))
  }, [overworkTime])

  return (
    <Widget title="Количество часов за дежурство">
      <Form
        onFinish={setOverworkTime}
        size="small"
        style={{ maxWidth: '400px' }}
        fields={initialData}
      >
        {weekDays.map((day) => (
          <Form.Item
            {...formItemLayout}
            name={Object.keys(day)[0]}
            label={Object.values(day)[0]}
            rules={[{ required: true, message: 'Введите количество часов!' }]}
            key={Object.keys(day)[0]}
          >
            <InputNumber
              placeholder="Введите количество часов"
              style={{ width: '100%' }}
              parser={(value) => value!.replace(',', '.')}
              formatter={(value) => `${value}`.replace('.', ',')}
            />
          </Form.Item>
        ))}
        <Button
          htmlType="submit"
          type="primary"
        >
          Сохранить
        </Button>
      </Form>
    </Widget>
  )
}
