import { memo, ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { classNames } from '../../../lib/classNames/classNames'
import cls from './AppLink.module.scss'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
  className?: string
  children?: ReactNode
  theme?: AppLinkTheme
}

export const AppLink = memo((props: AppLinkProps) => {
  const { className, children, to, theme = AppLinkTheme.PRIMARY, ...otherProps } = props

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  )
})
