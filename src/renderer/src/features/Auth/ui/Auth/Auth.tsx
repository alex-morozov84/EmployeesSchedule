import { useUser } from '@renderer/entities/User'
import { LoginForm } from '../LoginForm/LoginForm'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './Auth.module.scss'

export const Auth = () => {
  const user = useUser()

  return (
    <div className={classNames(cls.LoginFormWrapper)}>
      {user?.id ? <LogoutButton /> : <LoginForm />}
    </div>
  )
}
