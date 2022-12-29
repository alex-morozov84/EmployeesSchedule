import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Button } from '@renderer/shared/ui/Button'
import cls from './PageError.module.scss'

export const PageError = () => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <div className={classNames(cls.PageError)}>
      <p>Произошла непредвиденная ошибка</p>
      <Button onClick={reloadPage}>Обновить страницу</Button>
    </div>
  )
}
