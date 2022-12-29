import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'
import { EmployeeSchema } from '@renderer/entities/Employee'
import { OverworkSchema } from '@renderer/entities/Overwork'
import { WorkdaySchema } from '@renderer/entities/Workday'
import { UserSchema } from '@renderer/entities/User'

export interface StateSchema {
  employee: EmployeeSchema
  overwork: OverworkSchema
  workday: WorkdaySchema
  user: UserSchema
  // [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  // async reducers
}

export type StateSchemaKey = keyof StateSchema

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  // api: AxiosInstance
  api: ''
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
