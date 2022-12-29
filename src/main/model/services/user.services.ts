import { LoginDTO } from '../controllers/user.controller'
import { dataSource } from '../../config/db'
import { User } from '../entities/user.entity'

const userRepository = dataSource.getRepository(User)

export const userLogin = async (userData: LoginDTO) => {
  return await userRepository.findOne({ where: { ...userData } })
}
