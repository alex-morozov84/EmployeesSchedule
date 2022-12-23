// Доделать когда появится авторизация
// export const getSidebarItems = createSelector()

import { SidebarItemType } from '../types/sidebar'
import {
  getRouteEmployees,
  getRouteMain,
  getRouteWorkDay,
  getRoutHours
} from '@renderer/shared/const/router'
import { CalendarOutlined, TeamOutlined, TableOutlined, FieldTimeOutlined } from '@ant-design/icons'

export const sidebarItemsList: SidebarItemType[] = [
  {
    path: getRouteMain(),
    Icon: <CalendarOutlined />,
    text: 'Главная'
  },
  {
    path: getRouteEmployees(),
    Icon: <TeamOutlined />,
    text: 'Сотрудники'
  },
  {
    path: getRouteWorkDay(),
    Icon: <TableOutlined />,
    text: 'День'
  },
  {
    path: getRoutHours(),
    Icon: <FieldTimeOutlined />,
    text: 'Часы'
  }
]
