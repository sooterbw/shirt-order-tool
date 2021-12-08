const { app, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
  const window = new BrowserWindow({
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      },
      icon:'./shirt.png'
  }
  );
  window.loadFile(path.join(__dirname, "public/index.html"));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});