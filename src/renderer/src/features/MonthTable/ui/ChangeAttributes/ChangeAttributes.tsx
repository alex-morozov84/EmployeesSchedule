import { Button, Select } from 'antd'
import React, { useCallback, useState } from 'react'
import { WorkdayAttribute } from '@renderer/entities/Workday'
import { setWorkday } from '@renderer/entities/Workday'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchEmployees } from '@renderer/entities/Employee'
import { ChangeAttributeData } from '../MonthTable/MonthTable'
import cls from './ChangeAttributes.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import dayjs from 'dayjs'

interface ChangeAttributesProps {
  checkboxes: boolean
  setCheckboxes: React.Dispatch<React.SetStateAction<boolean>>
  checkedData: ChangeAttributeData[]
  setCheckedData: React.Dispatch<React.SetStateAction<ChangeAttributeData[]>>
}

const attributesOptions = [
  { value: 'onWork', label: 'На работе' },
  { value: 'disease', label: 'Больничный' },
  { value: 'watch', label: 'Дежурство' },
  { value: 'vacation', label: 'Отпуск' },
  { value: 'dayOff', label: 'Отгул' }
]

export const ChangeAttributes = ({
  checkboxes,
  setCheckboxes,
  checkedData,
  setCheckedData
}: ChangeAttributesProps) => {
  const dispatch = useAppDispatch()
  const [attribute, setAttribute] = useState<WorkdayAttribute>('onWork')

  const onSetCheckboxes = useCallback(() => {
    setCheckboxes(true)
  }, [setCheckboxes])

  const onSetAttributeFromSelect = useCallback(
    (value: string) => {
      setAttribute(value as WorkdayAttribute)
    },
    [setAttribute]
  )

  const onCancel = useCallback(() => {
    setCheckboxes(false)
  }, [setCheckboxes])

  const onChangeAttributes = useCallback(async () => {
    if (attribute && checkedData.length) {
      for (const data of checkedData) {
        await dispatch(
          setWorkday({
            date: data.date,
            weekDay: data.weekDay,
            dateFormat: dayjs(data.date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            attribute,
            employeeId: data.employeeId
          })
        )
      }
      dispatch(fetchEmployees('all'))
      setCheckedData([])
      setCheckboxes(false)
    }
  }, [attribute, checkedData, dispatch, setCheckboxes, setCheckedData])

  return (
    <div className={classNames(cls.wrapper)}>
      {checkboxes ? (
        <>
          <Select
            defaultValue={'onWork'}
            style={{ width: '300px' }}
            options={attributesOptions}
            onChange={onSetAttributeFromSelect}
          />
          <Button
            onClick={onChangeAttributes}
            type="primary"
          >
            Применить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </>
      ) : (
        <Button
          onClick={onSetCheckboxes}
          type="primary"
        >
          Изменить
        </Button>
      )}
    </div>
  )
}
