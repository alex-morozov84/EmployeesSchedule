import { ReactElement } from 'react'

export interface SidebarItemType {
  path: string
  text: string
  Icon: ReactElement
  authOnly?: boolean
}
