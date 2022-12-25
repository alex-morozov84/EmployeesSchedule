import { Button, Input, Space } from 'antd'
import React, { useCallback, useState } from 'react'
import { addEmployee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Widget } from '@renderer/shared/ui/Widget'

export const AddEmployee = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')
  const [validationError, setValidationError] = useState('')

  const addNewEmployee = useCallback(async () => {
    if (inputValue) {
      dispatch(addEmployee({ name: inputValue }))
      setInputValue('')
    } else {
      setValidationError('Не указаны ФИО сотрудника!')
    }
  }, [dispatch, inputValue])

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError('')
    setInputValue(e.target.value)
  }, [])

  return (
    <Widget title={'Добавить сотрудника'}>
      <Space
        direction="vertical"
        style={{ display: 'flex' }}
      >
        <Input
          placeholder={validationError || 'Введите ФИО сотрудника'}
          value={inputValue}
          onChange={inputChangeHandler}
          status={validationError ? 'error' : ''}
          style={{ maxWidth: '400px' }}
        />
        <Button
          type="primary"
          onClick={addNewEmployee}
        >
          Добавить
        </Button>
      </Space>
    </Widget>
  )
}
