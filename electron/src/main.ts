import { app, BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

let win: BrowserWindow | null = null

const iconPath = './public/icons/256x256.ico'
let filePath = ''

const createWindow = () => {
  win = new BrowserWindow({
    title: 'Rick Survival',
    center: true,
    darkTheme: true,
    backgroundColor: '#38393D',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (isDev) {
    filePath = '../../_build/index.html'
    win.setMenuBarVisibility(true)
    win.webContents.openDevTools({
      mode: 'bottom',
      activate: true,
    })
  } else {
    filePath = './index.html'
    win.setMenuBarVisibility(false)
  }

  win.loadFile(filePath)

  win.setIcon(iconPath)

  win.maximize()

  win.on('closed', () => {
    win = null
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
