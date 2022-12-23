import { useCallback, Suspense } from 'react'
import { AppRouteProps } from '@renderer/shared/types/router'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '../config/routeConfig'

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = <Suspense fallback={''}>{route.element}</Suspense>

    return (
      <Route
        key={route.path}
        path={route.path}
        // element={route.authOnly ?  <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
        element={element}
      />
    )
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}
