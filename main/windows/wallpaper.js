// Native
const { format } = require("url");

// Packages
const electron = require("electron");
const isDev = require("electron-is-dev");
const { resolve } = require("app-root-path");

exports.wallpaperWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const win = new electron.BrowserWindow({
    x: -100,
    y: -100,
    width: width + 200,
    height: height + 200,
    type: "desktop",
    titleBarStyle: "hidden",
    center: true,
    enableLargerThanScreen: true,
  });

  const devPath = "http://localhost:8000/wallpaper";

  const prodPath = format({
    pathname: resolve("renderer/out/wallpaper/index.html"),
    protocol: "file:",
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  win.loadURL(url);

  return win;
};
