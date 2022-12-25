import { buildSelector } from '@renderer/shared/store'

export const [useOverwork, getOverwork] = buildSelector((state) => state.overwork.overwork)
