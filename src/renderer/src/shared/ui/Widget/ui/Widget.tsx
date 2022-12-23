import { ReactNode } from 'react'
import cls from './Widget.module.scss'
import { classNames } from '../../../lib/classNames/classNames'

interface WidgetProps {
  title?: string
  maxHeight?: string
  maxWidth?: string
  children: ReactNode
}

export const Widget = ({ title, children }: WidgetProps) => {
  return (
    <div className={classNames(cls.Widget)}>
      {title && <div className={classNames(cls.title)}>{title}</div>}
      <div className={classNames(cls.content)}>{children}</div>
    </div>
  )
}
