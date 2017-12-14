// Native
const { format } = require("url");

// Packages
const electron = require("electron");
const isDev = require("electron-is-dev");
const { resolve } = require("app-root-path");

// Utilities
const attachTrayState = require("../utils/highlight");
const positionWindow = require("../utils/position");

// Check if Windows
const isWinOS = process.platform === "win32";

exports.mainWindow = tray => {
  let windowHeight = 380;

  if (isWinOS) {
    windowHeight -= 12;
  }

  const win = new electron.BrowserWindow({
    width: 330,
    height: windowHeight,
    title: "Livepapers",
    resizable: false,
    show: false,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    transparent: true,
    frame: false,
    movable: false,
    webPreferences: {
      backgroundThrottling: false,
      devTools: true,
    },
  });

  win.toggleDevTools();

  positionWindow(tray, win);
  attachTrayState(win, tray);

  const devPath = "http://localhost:8000/tray";

  const prodPath = format({
    pathname: resolve("renderer/out/tray/index.html"),
    protocol: "file:",
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  win.loadURL(url);

  // Hide window if it's not focused anymore
  // This can only happen if the dev tools are not open
  // Otherwise, we won't be able to debug the renderer
  win.on("blur", () => {
    if (win.webContents.isDevToolsOpened()) {
      return;
    }

    if (!isWinOS) {
      win.close();
      return;
    }

    const { screen } = electron;
    const cursor = screen.getCursorScreenPoint();
    const trayBounds = global.tray.getBounds();

    const xAfter = cursor.x <= trayBounds.x + trayBounds.width;
    const x = cursor.x >= trayBounds.x && xAfter;
    const yAfter = trayBounds.y + trayBounds.height;
    const y = cursor.y >= trayBounds.y && cursor.y <= yAfter;

    // Don't close the window on click on the tray icon
    // Because that will already toogle the window
    if (x && y) {
      return;
    }

    win.close();
  });

  return win;
};
