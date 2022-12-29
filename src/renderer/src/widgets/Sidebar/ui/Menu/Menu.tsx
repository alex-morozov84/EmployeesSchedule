import { Menu } from 'antd'
import { useMemo } from 'react'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import type { MenuProps } from 'antd'
import { AppLink } from '@renderer/shared/ui/AppLink'
import { useSelector } from 'react-redux'

export const SidebarMenu = () => {
  const sidebarItemsList = useSelector(getSidebarItems)

  const menuItems: MenuProps['items'] = useMemo(
    () =>
      sidebarItemsList.map((item) => ({
        key: item.path,
        // icon: item.Icon,
        icon: <AppLink to={item.path}>{item.Icon}</AppLink>,
        label: item.text
      })),
    [sidebarItemsList]
  )

  return (
    <Menu
      theme={'dark'}
      items={menuItems}
    />
  )
}
