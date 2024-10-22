// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window["ipcRenderer"] = require('electron').ipcRenderer;

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, (process.versions as any)[type]);
  }
});


