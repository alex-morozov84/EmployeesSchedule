import { Button } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { Employee } from '@renderer/entities/Employee'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'
import { useCallback } from 'react'

interface DayOffProps {
  employee: Employee
  date: Dayjs
}

export const DayOff = ({ employee, date }: DayOffProps) => {
  const currentDate = dayjs().format('DD.MM.YYYY')
  const dayOffDate = date.format('DD.MM.YYYY')

  const onCreateReport = useCallback(async () => {
    const { ipcRenderer } = window.electron
    const response = await ipcRenderer.invoke('getFileTemplate', 'dayOff')

    const zip = new PizZip(response)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    })

    doc.setData({
      name: employee.name,
      rank: employee.rank,
      position: employee.position,
      date: dayOffDate,
      currentDate
    })

    try {
      doc.render()
    } catch (e) {
      console.log(e)
    }

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
    saveAs(out, `Отгул_${dayOffDate}.docx`)
  }, [currentDate, dayOffDate, employee.name, employee.position, employee.rank])

  return (
    <Button
      type="primary"
      onClick={onCreateReport}
    >
      Отгул
    </Button>
  )
}
