import { app, ipcMain } from 'electron'
import { rootPath } from 'electron-root-path'

export const testController = () => {
  ipcMain.handle('getPath', async () => {
    return {
      userData: app.getPath('userData'),
      home: app.getPath('home'),
      appData: app.getPath('appData'),
      rootPath,
      getAppPath: app.getAppPath(),
      getAppPathExe: app.getPath('exe'),
      argv: process.argv,
      portExecDir: process.env.PORTABLE_EXECUTABLE_DIR,
      portExecFile: process.env.PORTABLE_EXECUTABLE_FILE
    }
  })
}
