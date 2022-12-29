import { useCallback } from 'react'
import { Button, Form, Input } from 'antd'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { login } from '@renderer/entities/User'
import { Widget } from '@renderer/shared/ui/Widget'

export const LoginForm = () => {
  const dispatch = useAppDispatch()

  const onUserLogin = useCallback(
    (userData) => {
      dispatch(login(userData))
    },
    [dispatch]
  )

  return (
    <Widget>
      <Form
        size="small"
        onFinish={onUserLogin}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите логин!' }]}
          style={{ margin: 0 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
          style={{ marginBottom: '10px' }}
        >
          <Input.Password />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Войти
        </Button>
      </Form>
    </Widget>
  )
}
