import { ReactNode } from 'react'
import cls from './Layout.module.scss'
import { classNames } from '../../../lib/classNames/classNames'

interface LayoutProps {
  title: string
  children?: ReactNode
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className={classNames(cls.layoutWrapper)}>
      <div className={classNames(cls.layoutTitle)}>{title}</div>
      {children}
    </div>
  )
}
