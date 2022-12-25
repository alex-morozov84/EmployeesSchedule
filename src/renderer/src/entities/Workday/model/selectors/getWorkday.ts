import { buildSelector } from '@renderer/shared/store'

export const [useWorkday, getWorkday] = buildSelector((state) => state.workday.workday)
