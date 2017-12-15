// Packages
const { app } = require("electron");

const states = {
  hide: false,
  show: true,
  minimize: false,
  restore: true,
  focus: true,
};

const windowLeft = win => {
  const windows = global.windows;

  if (!windows) {
    return false;
  }

  if (windows.welcome && windows.about === win && windows.welcome.isVisible()) {
    return true;
  }

  if (windows.about && windows.welcome === win && windows.about.isVisible()) {
    return true;
  }

  return false;
};

module.exports = (win, tray) => {
  if (!tray) {
    return;
  }

  for (const state in states) {
    if (!{}.hasOwnProperty.call(states, state)) {
      return;
    }

    const highlighted = states[state];

    win.on(state, () => {
      // Don't toggle highlighting if one window is still open
      if (windowLeft(win)) {
        return;
      }

      // Highlight the tray or don't
      tray.setHighlightMode(highlighted ? "always" : "selection");
    });
  }

  app.on("before-quit", () => {
    win.destroy();
  });

  win.on("close", event => {
    event.preventDefault();
    win.hide();
  });
};
