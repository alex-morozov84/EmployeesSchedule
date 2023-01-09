import dayjs from 'dayjs'
import { Employee } from '@renderer/entities/Employee'

const currentYear = dayjs().year()

// Оставляем даты только текущего года
export const filterEmployeeCurrentYearWorkdays = (employee: Employee) => {
  return [
    ...(employee.workdays?.filter(
      (day) =>
        dayjs(day.date, 'DD.MM.YYYY').diff(dayjs(`${currentYear}-01-01`, 'YYYY-MM-DD')) >= 0 &&
        dayjs(day.date, 'DD.MM.YYYY').diff(dayjs(`${currentYear}-12-31`, 'YYYY-MM-DD')) <= 0
    ) || [])
  ]
}

// Подсчет общего количества часов за период
export const countTotalHours = (employee: Employee) => {
  return (
    employee.workdays?.reduce((acc, day) => {
      if (day.attribute === 'watch') {
        // return acc + overwork[day.weekDay]
      }
      if (day.attribute === 'dayOff') {
        return acc - 8
      }
      return acc
    }, +employee.timeOffset) || 0
  )
}
