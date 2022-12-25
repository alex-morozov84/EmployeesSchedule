import { Drawer } from 'antd'
import { Employee } from '@renderer/entities/Employee'
import { EmployeeFrom } from '../EmployeeForm/EmployeeFrom'

interface ChangeEmployeeDataProps {
  open: boolean
  close: () => void
  employee: Employee
}

export const ChangeEmployeeData = ({ open, close, employee }: ChangeEmployeeDataProps) => {
  return (
    <Drawer
      title={employee.name}
      open={open}
      onClose={close}
      closable
      width="50%"
      destroyOnClose
    >
      <EmployeeFrom employee={employee} />
    </Drawer>
  )
}
