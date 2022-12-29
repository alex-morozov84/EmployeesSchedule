import { Select } from 'antd'
import { useEmployees } from '@renderer/entities/Employee'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch } from '@renderer/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchEmployees } from '@renderer/entities/Employee'
import { Employee } from '@renderer/entities/Employee'

interface EmployeeSelectProps {
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>
  type: 'all' | 'withHours'
}

export const EmployeeSelect = ({ setEmployee, type }: EmployeeSelectProps) => {
  const dispatch = useAppDispatch()
  const employees = useEmployees()

  const selectOptions = useMemo(
    () =>
      employees.map((employee) => ({
        value: employee.name,
        label: employee.name,
        employee: employee
      })),
    [employees]
  )

  const filterOption = useCallback(
    (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
    []
  )

  const onEmployeeChange = useCallback(
    (_, data: { value: string; label: string; employee: Employee }) => {
      setEmployee(data?.employee)
    },
    [setEmployee]
  )

  useEffect(() => {
    dispatch(fetchEmployees(type))
    // eslint-disable-next-line
  }, [])

  return (
    <Select
      showSearch
      placeholder="Выберите сотрудника"
      options={selectOptions}
      filterOption={filterOption}
      // @ts-ignore data может быть массивом, но не в этом случае
      onChange={onEmployeeChange}
      style={{ width: '300px' }}
    />
  )
}
