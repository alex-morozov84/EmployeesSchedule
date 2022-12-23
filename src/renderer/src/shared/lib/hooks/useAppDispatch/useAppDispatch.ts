import { useDispatch } from 'react-redux'
import { AppDispatch } from '@renderer/app/providers/StoreProvider'

export const useAppDispatch = () => useDispatch<AppDispatch>()
