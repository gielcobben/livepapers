// Packages
const { app, Tray } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const { resolve } = require("app-root-path");

// Windows
const { wallpaperWindow } = require("./windows/wallpaper");
const { mainWindow } = require("./windows/main");

// Utilities
const toggleWindow = require("./utils/toggle");

// Hide the dock icon
if (isDev && process.platform === "darwin") {
  app.dock.hide();
}

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

  // Only allow one instance of Livepapers running at the same time
  const shouldQuit = app.makeSingleInstance(toggleActivity);

  if (shouldQuit) {
    // We're using `exit` because `quit` didn't work on Windows
    return app.exit();
  }

  // if (!main.isVisible()) {
  //   main.once("ready-to-show", toggleActivity);
  // }

  tray.on("click", toggleActivity);
});
