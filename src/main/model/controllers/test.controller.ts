import { app, ipcMain } from 'electron'

export const testController = () => {
  ipcMain.handle('getPath', async () => {
    return {
      userData: app.getPath('userData'),
      home: app.getPath('home'),
      appData: app.getPath('appData')
    }
  })
}
