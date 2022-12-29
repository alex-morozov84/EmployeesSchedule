import { useDownloadExcel } from 'react-export-table-to-excel'
import React from 'react'
import { FileExcelOutlined } from '@ant-design/icons'
import cls from './SaveToExcel.module.scss'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Tooltip } from 'antd'

interface SaveToExcelProps {
  tableRef: React.MutableRefObject<null>
  filename?: string
}

export const SaveToExcel = ({ tableRef, filename = 'file' }: SaveToExcelProps) => {
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename,
    sheet: 'График'
  })

  return (
    <Tooltip
      title={'Сохранить в Excel'}
      placement="left"
    >
      <FileExcelOutlined
        onClick={onDownload}
        className={classNames(cls.icon)}
      />
    </Tooltip>
  )
}
