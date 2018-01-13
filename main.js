const electron = require("electron");

const { ipcRenderer } = electron;
const list = document.querySelector("ul#todos");

ipcRenderer.on("todo:add", (event, todo) => {
  const todoItem = document.createElement("li");
  todoItem.innerHTML = todo;
  list.appendChild(todoItem);
});

ipcRenderer.on("todo:clearAll", () => {
  list.innerHTML = "";
});
