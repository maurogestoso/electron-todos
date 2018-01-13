const electron = require("electron");

const { ipcRenderer } = electron;

ipcRenderer.on("todo:add", (event, todo) => {
  const todoItem = document.createElement("li");
  todoItem.innerHTML = todo;

  document.querySelector("ul#todos").appendChild(todoItem);
});
