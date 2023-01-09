import { app, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'

const TemplatePaths = {
  // dayOff: './day-off-template.docx',
  dayOff: path.join(process.env.PORTABLE_EXECUTABLE_DIR || '', 'data', 'day-off-template.docx'),
  // dayOff: path.join(app.getPath('home'), 'employee', 'day-off-template.docx'),
  another: path.join(app.getPath('home'), 'employee', 'another.docx')
} as const

type TemplateType = keyof typeof TemplatePaths

export const filesController = () => {
  ipcMain.handle('getFileTemplate', async (_, type: TemplateType) => {
    // return await fs.readFileSync('./word-temp.docx')
    return fs.readFileSync(TemplatePaths[type])
  })
}
