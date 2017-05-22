const electron = require('electron')
const { app, BrowserWindow, Tray, ipcMain } = electron

let WIN_WIDTH = 420
let WIN_HEIGHT = 250
const appIcon = `${__dirname}/app/assets/img/youtube.png`
let tray = null

const launchMainWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    icon: appIcon,
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
    alwaysOnTop: true,
    frame: false,
    show: false,
    x: width - WIN_WIDTH,
    y: height - WIN_HEIGHT
  })

  tray = new Tray(appIcon)

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  mainWindow.show()

  // saporra de linux tá bugada, vamo na gambiarra pq nois é BR
  setInterval(() => { if (mainWindow != null) { mainWindow.setAlwaysOnTop(true) } }, 1)
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', launchMainWindow)

ipcMain.on('asynchronous-message', (event, arg) => {
  if (arg == "shutdown") { app.quit() }
})

app.on('window-all-closed', () => { app.quit() })
