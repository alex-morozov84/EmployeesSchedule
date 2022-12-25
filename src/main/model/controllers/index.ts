import { employeeController } from './employee.controller'
import { overworkController } from './overwork.controller'
import { workdayController } from './workday.controller'

const setControllers = () => {
  employeeController()
  overworkController()
  workdayController()
}

export { setControllers }
