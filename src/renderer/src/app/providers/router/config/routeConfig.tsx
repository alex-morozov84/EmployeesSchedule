import { AppRoutes } from '@renderer/shared/const/router'
import { AppRouteProps } from '@renderer/shared/types/router'
import {
  getRouteEmployees,
  getRouteMain,
  getRouteWorkDay,
  getRouteHours,
  getRouteMonth,
  getRouteReport
} from '@renderer/shared/const/router'
import { MainPage } from '@renderer/pages/MainPage'
import { EmployeesPage } from '@renderer/pages/EmployeesPage'
import { HoursPage } from '@renderer/pages/HoursPage'
import { WorkDayPage } from '@renderer/pages/WorkDayPage'
import { MonthPage } from '@renderer/pages/MonthPage'
import { ReportPage } from '@renderer/pages/ReportPage'

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
    path: getRouteHours(),
    element: <HoursPage />
  },
  [AppRoutes.WORK_DAY]: {
    path: getRouteWorkDay(),
    element: <WorkDayPage />
  },
  [AppRoutes.MONTH]: {
    path: getRouteMonth(),
    element: <MonthPage />
  },
  [AppRoutes.REPORT]: {
    path: getRouteReport(),
    element: <ReportPage />
  }
}
