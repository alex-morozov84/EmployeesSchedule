import { employeeController } from './employee.controller'
import { overworkController } from './overwork.controller'
import { workdayController } from './workday.controller'
import { userController } from './user.controller'
import { filesController } from './files.controller'
import { testController } from './test.controller'

const setControllers = () => {
  employeeController()
  overworkController()
  workdayController()
  userController()
  filesController()
  testController()
}

export { setControllers }
