// Native
const { format } = require("url");

// Packages
const electron = require("electron");
const { BrowserWindow, app } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const { resolve } = require("app-root-path");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    x: -100,
    y: -100,
    width: width + 200,
    height: height + 200,
    type: "desktop",
    titleBarStyle: "hidden",
    center: true,
    enableLargerThanScreen: true,
  });

  // mainWindow.toggleDevTools();

  const devPath = "http://localhost:8000/start";

  const prodPath = format({
    pathname: resolve("renderer/out/start/index.html"),
    protocol: "file:",
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  mainWindow.loadURL(url);
});

// Hide dock icon
app.dock.hide();

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
