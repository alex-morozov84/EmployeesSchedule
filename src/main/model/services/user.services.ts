import { dataSource } from '../../config/db'
import { Post } from '../entities/post.entity'

export const getData = async () => {
  const repo = dataSource.getRepository(Post)
  if (repo) {
    const result = await repo.find()
    return result
  } else {
    return
  }
}
