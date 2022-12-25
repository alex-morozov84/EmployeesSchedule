export interface Overwork {
  monday: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  saturday: number
  sunday: number
}

export interface OverworkSchema {
  overwork: Overwork
  error?: string
  isLoading: boolean
}
