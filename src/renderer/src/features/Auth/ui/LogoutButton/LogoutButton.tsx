import { Button } from 'antd'
import { useCallback } from 'react'
import { useUserActions } from '@renderer/entities/User'

export const LogoutButton = () => {
  const { logout } = useUserActions()
  const onUserLogout = useCallback(() => {
    logout()
  }, [logout])

  return <Button onClick={onUserLogout}>Выход</Button>
}
