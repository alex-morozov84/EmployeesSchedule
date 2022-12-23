import { Layout } from 'antd'
import { useCallback, useState } from 'react'
import { SidebarMenu } from '../Menu/Menu'

export const Sidebar = () => {
  const { Sider } = Layout
  const [collapsed, setCollapsed] = useState(false)

  const collapseHandler = useCallback((value: boolean) => {
    setCollapsed(value)
  }, [])

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={collapseHandler}>
      <SidebarMenu />
    </Sider>
  )
}
