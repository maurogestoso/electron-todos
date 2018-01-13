const electron = require("electron");

const { ipcRenderer } = electron;

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  const todo = event.target.elements.todoInput.value;

  ipcRenderer.send("todo:add", todo);
});
