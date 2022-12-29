import { SidebarItemType } from '../types/sidebar'
import {
  getRouteEmployees,
  getRouteMain,
  getRouteWorkDay,
  getRouteHours,
  getRouteMonth,
  getRouteReport
} from '@renderer/shared/const/router'
import {
  CalendarOutlined,
  TeamOutlined,
  TableOutlined,
  FieldTimeOutlined,
  OrderedListOutlined,
  FormOutlined
} from '@ant-design/icons'
import { createSelector } from '@reduxjs/toolkit'
import { getUser } from '@renderer/entities/User'

export const getSidebarItems = createSelector(getUser, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: <CalendarOutlined />,
      text: 'Главная'
    },
    {
      path: getRouteMonth(),
      Icon: <OrderedListOutlined />,
      text: 'Месяц'
    },
    {
      path: getRouteReport(),
      Icon: <FormOutlined />,
      text: 'Рапорт'
    }
  ]

  if (userData?.id) {
    sidebarItemsList.push(
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
        path: getRouteHours(),
        Icon: <FieldTimeOutlined />,
        text: 'Часы'
      }
    )
  }

  return sidebarItemsList
})
