import { Menu } from 'antd'
import { useMemo } from 'react'
import { sidebarItemsList } from '../../model/selectors/getSidebarItems'
import type { MenuProps } from 'antd'
import { AppLink } from '../../../../shared/ui/AppLink'

export const SidebarMenu = () => {
  const menuItems: MenuProps['items'] = useMemo(
    () =>
      sidebarItemsList.map((item) => ({
        key: item.path,
        // icon: item.Icon,
        icon: <AppLink to={item.path}>{item.Icon}</AppLink>,
        label: item.text
      })),
    []
  )

  return <Menu theme={'dark'} items={menuItems} />
}
