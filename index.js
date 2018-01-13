const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, addWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  mainWindow.on("closed", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const createAddWindow = () => {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add New Todo"
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);

  addWindow.on("closed", () => (addWindow = null)); // for garbage collection
};

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        accelerator: process.platform === "darwin" ? "Command+N" : "Control+N",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Control+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === "darwin") menuTemplate.unshift({});

// enable Toggle Developer Tools outside production
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Developer",
    submenu: [
      { role: "reload" },
      {
        label: "Toggle Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Control+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
