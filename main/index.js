// Packages
const { app, Tray } = require("electron");
const prepareNext = require("electron-next");
const { resolve } = require("app-root-path");

// Windows
const { wallpaperWindow } = require("./windows/wallpaper");
const { mainWindow } = require("./windows/main");

// Utilities
const toggleWindow = require("./utils/toggle");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");
  const tray = new Tray(resolve(`./main/static/icon-white.png`));

  const windows = {
    wallpaper: wallpaperWindow(),
    main: mainWindow(tray),
  };

  const main = windows.main;

  global.windows = windows;
  global.tray = tray;

  const toggleActivity = async event => {
    toggleWindow(event || null, windows.main, tray);
  };

  if (!main.isVisible()) {
    main.once("ready-to-show", toggleActivity);
  }

  tray.on("click", toggleActivity);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
