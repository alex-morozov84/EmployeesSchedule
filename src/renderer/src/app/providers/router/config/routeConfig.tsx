import { AppRoutes } from '@renderer/shared/const/router'
import { AppRouteProps } from '@renderer/shared/types/router'
import {
  getRouteEmployees,
  getRouteMain,
  getRouteWorkDay,
  getRoutHours
} from '@renderer/shared/const/router'
import { MainPage } from '@renderer/pages/MainPage'
import { EmployeesPage } from '@renderer/pages/EmployeesPage'
import { HoursPage } from '@renderer/pages/HoursPage'
import { WorkDayPage } from '@renderer/pages/WorkDayPage'

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />
  },
  [AppRoutes.EMPLOYEES]: {
    path: getRouteEmployees(),
    element: <EmployeesPage />
  },
  [AppRoutes.HOURS]: {
    path: getRoutHours(),
    element: <HoursPage />
  },
  [AppRoutes.WORK_DAY]: {
    path: getRouteWorkDay(),
    element: <WorkDayPage />
  }
}
