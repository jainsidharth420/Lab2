// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('ipcRenderer', {
// send: (channel, data) => ipcRenderer.send(channel, data),
// on: (channel, func) =>
// ipcRenderer.on(channel, (event, ...args) => func(...args)),
// });
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
