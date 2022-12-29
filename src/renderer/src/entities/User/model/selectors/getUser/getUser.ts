import { buildSelector } from '@renderer/shared/store'

export const [useUser, getUser] = buildSelector((state) => state.user.userData)
