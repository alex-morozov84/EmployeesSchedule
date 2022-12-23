import { Input } from 'antd'
import React, { useCallback, useState } from 'react'
import { addEmployee } from '@renderer/entities/Employee'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'

export const AddEmployee = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')

  const addNewEmployee = useCallback(async () => {
    dispatch(addEmployee({ name: inputValue }))
    setInputValue('')
  }, [dispatch, inputValue])

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <>
      <Input
        placeholder="Введите ФИО сотрудника"
        value={inputValue}
        onChange={inputChangeHandler}
      />
      <button onClick={addNewEmployee}>Добавить</button>
    </>
  )
}
