import { Button } from 'antd'
import { Dayjs } from 'dayjs'
import { Employee } from '@renderer/entities/Employee'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'
import { useCallback } from 'react'

interface DayOffProps {
  employee: Employee
  date: Dayjs
}

interface DayOffReport {
  date: string
  fulldate: string
  position: string
  rank: string
  name: string
}

export const DayOff = ({ employee, date }: DayOffProps) => {
  const onCreateReport = useCallback(async () => {
    const { ipcRenderer } = window.electron
    const response = await ipcRenderer.invoke('getFileTemplate', 'dayOff')
    console.log(response)

    const zip = new PizZip(response)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    })

    doc.setData({
      name: employee.name
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
    saveAs(out, 'output.docx')
  }, [employee.name])

  return (
    <Button
      type="primary"
      onClick={onCreateReport}
    >
      Отгул
    </Button>
  )
}
