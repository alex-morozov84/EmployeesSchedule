import { dataSource } from '../../config/db'
import { Overwork } from '../entities/overwork.entity'
import { OverworkTimeDTO } from '../controllers/overwork.controller'

const overworkRepository = dataSource.getRepository(Overwork)

export const getOverworkTime = async () => {
  try {
    const result = await overworkRepository.find()

    const data = {}
    result.forEach((item) => {
      data[item.weekDay] = item.overworkTime
    })
    return data
  } catch (e) {
    console.log(e)
    return
  }
}

export const setOverworkTime = async (overworkTime: OverworkTimeDTO) => {
  try {
    let day: keyof typeof overworkTime
    for (day in overworkTime) {
      const overworkDay = await overworkRepository.findOne({ where: { weekDay: day } })
      if (overworkDay) {
        overworkDay.overworkTime = overworkTime[day]
        await overworkRepository.save(overworkDay)
      } else {
        const newOverworkDay = await overworkRepository.create({
          weekDay: day,
          overworkTime: overworkTime[day]
        })
        await overworkRepository.save(newOverworkDay)
      }
    }
    return overworkTime
  } catch (e) {
    console.log(e)
    return
  }
}
