// Packages
const { app, Tray } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const { resolve } = require("app-root-path");
const firstRun = require("first-run");

// Windows
const { wallpaperWindow } = require("./windows/wallpaper");
const { mainWindow } = require("./windows/main");
const { welcomeWindow } = require("./windows/welcome");

// Utilities
const toggleWindow = require("./utils/toggle");

// Set the application's name
app.setName("Livepapers");

// Hide the dock icon
if (isDev && process.platform === "darwin") {
  app.dock.hide();
}

// Make Now start automatically on login
if (!isDev && firstRun()) {
  app.setLoginItemSettings({
    openAtLogin: true,
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  // Tray
  const iconName = process.platform === "win32" ? "iconWhite" : "iconTemplate";
  const tray = new Tray(resolve(`./main/static/tray/${iconName}.png`));
  global.tray = tray;

  // Windows
  const windows = {
    welcome: welcomeWindow(tray),
    main: mainWindow(tray),
    wallpaper: wallpaperWindow(),
  };
  const main = windows.main;
  const welcome = windows.welcome;

  global.windows = windows;

  // Toggle window
  const toggleActivity = async event => {
    // toggleWindow(event || null, windows.main, tray);
    toggleWindow(event || null, windows.welcome);
  };

  // Only allow one instance of Livepapers running at the same time
  const shouldQuit = app.makeSingleInstance(toggleActivity);

  if (shouldQuit) {
    return app.exit();
  }

  if (isDev) {
    welcome.once("ready-to-show", toggleActivity);
  }

  // if (!main.isVisible()) {
  //   main.once("ready-to-show", toggleActivity);
  // }

  tray.on("click", toggleActivity);
});
