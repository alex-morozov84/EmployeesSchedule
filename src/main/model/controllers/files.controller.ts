import { ipcMain } from 'electron'
import fs from 'fs'

const TemplatePaths = {
  dayOff: './day-off-template.docx',
  another: './another.docx'
} as const

type TemplateType = keyof typeof TemplatePaths

export const filesController = () => {
  ipcMain.handle('getFileTemplate', async (_, type: TemplateType) => {
    // return await fs.readFileSync('./word-temp.docx')
    return fs.readFileSync(TemplatePaths[type])
  })
}
