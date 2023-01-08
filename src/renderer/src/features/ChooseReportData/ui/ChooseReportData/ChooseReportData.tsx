import { Widget } from '@renderer/shared/ui/Widget'
import { EmployeeSelect } from '../../../EmployeeSelect'
import { Employee } from '@renderer/entities/Employee'
import React from 'react'
import { Calendar } from 'antd'
import cls from './ChooseReportData.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Dayjs } from 'dayjs'

interface ChooseReportData {
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>
}

export const ChooseReportData = ({ setEmployee, setDate }: ChooseReportData) => {
  return (
    <Widget title="Данные для рапорта">
      <div className={classNames(cls.wrapper)}>
        <div className={classNames(cls.chooseEmployeeWrapper)}>
          <div className={classNames(cls.text)}>Выберите сотрудника:</div>
          <EmployeeSelect
            setEmployee={setEmployee}
            type={'all'}
          />
        </div>
        <div className={classNames(cls.chooseEmployeeWrapper)}>
          <div className={classNames(cls.text)}>Выберите дату отгула:</div>
          <div className={classNames(cls.calendarWrapper)}>
            <Calendar
              fullscreen={false}
              onSelect={setDate}
            />
          </div>
        </div>
      </div>
    </Widget>
  )
}
