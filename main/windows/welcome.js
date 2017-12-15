// Native
const { format } = require("url");

// Packages
const electron = require("electron");
const isDev = require("electron-is-dev");
const { resolve } = require("app-root-path");

// Utilities
const attachTrayState = require("../utils/highlight");

exports.welcomeWindow = tray => {
  const win = new electron.BrowserWindow({
    width: 600,
    height: 420,
    title: "Welcome to Livepapers",
    resizable: false,
    center: true,
    frame: false,
    show: false,
    fullscreenable: false,
    maximizable: false,
    titleBarStyle: "hidden-inset",
    backgroundColor: "#fff",
    webPreferences: {
      backgroundThrottling: false,
      devTools: true,
    },
  });

  const devPath = "http://localhost:8000/welcome";

  const prodPath = format({
    pathname: resolve("renderer/out/welcome/index.html"),
    protocol: "file:",
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  win.loadURL(url);

  win.toggleDevTools();

  attachTrayState(win, tray);

  const emitTrayClick = aboutWindow => {
    const emitClick = () => {
      if (aboutWindow && aboutWindow.isVisible()) {
        return;
      }

      // Automatically open the context menu
      if (tray) {
        tray.emit("click");
      }

      win.removeListener("hide", emitClick);
    };

    win.on("hide", emitClick);
    win.close();
  };

  win.on("open-tray", emitTrayClick);

  // Just hand it back
  return win;
};
