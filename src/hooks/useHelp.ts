import { matchRoutes, useLocation } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCurrentPath = (routes: any[], path: string) => {
  const location = useLocation()
  const matched = matchRoutes(routes, location)
  if (matched) {
    return matched[0].route.path === path ? true : false
  }
  return false
}
