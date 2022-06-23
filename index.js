const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    title: "Chit Chat",
    icon: __dirname + '/build/icon.png',
  })

  win.loadFile('index.html')
}

function setMenu() {
  const menu = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Close', accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        // { label: "Refresh", accelerator: "CmdOrCtrl+R", selector: "forceReload:" },
        // { type: "separator" },
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });

  setMenu();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
