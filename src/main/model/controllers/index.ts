import { getUsers } from './user.controller'
import { employeeController } from './employee.controller'

const setControllers = () => {
  getUsers()
  employeeController()
}

export { setControllers }
