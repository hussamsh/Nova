import { app, BrowserWindow , globalShortcut, dialog, ipcMain } from "electron";
import * as path from "path";
import { Events } from "./helpers/Enums";

let mainWindow: Electron.BrowserWindow;
let threadWindow : Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "./dist/preload.js"),
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
    width: 1200,
    height: 700,
    minWidth : 1200,
    minHeight : 700,
    frame : false,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "./app/index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();


  mainWindow.on('close' , () =>{
    
    if(threadWindow){
      ipcMain.removeAllListeners();
      threadWindow.removeAllListeners();
      threadWindow.destroy();
      threadWindow = null;
    }

  })
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    
    mainWindow = null;
  });

  // globalShortcut.register('CommandOrControl+R', function() {
	// 	mainWindow.reload()
  // })
  
  // globalShortcut.register('CommandOrControl+W', function() {
	// 	mainWindow.close()
  // })
  
  // globalShortcut.register('CommandOrControl+Shift+I', function() {
	// 	mainWindow.webContents.openDevTools();
  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.allowRendererProcessReuse = false

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


/*
  Listener for opening a directory selection to save the output file in
*/
ipcMain.on('select-dirs', async (event, arg) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })

  if(result.filePaths.length != 0){
    event.reply('folder-selected' , result.filePaths[0]);
  }

});


/*
  Listener for cryptographic operations - encrypt / decrypt .
*/
ipcMain.on('crypto' , (event , args) => {

    //Parameters that is unique to the current c`ryptographic algorithm
    //Restructure the input 
   let parameters = new Object();
   args["inputParams"].forEach((element) => {
      parameters[element.name] = element.value;
   });

  let data = {
      operation : args["operation"],
      algorithm : args["selectedAlgorithm"],
      parameters : parameters,
      imagePath : args["inputPath"],
      outputFolder : args["outputPath"],
      optimize : args["optimizeImage"]
  };
  
  threadWindow = new BrowserWindow({
    show: false,
    parent: mainWindow,
    webPreferences: {
        preload: path.join(__dirname, "./dist/preload.js"),
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        nodeIntegrationInSubFrames: true,
        devTools: true,
        backgroundThrottling: false
    }
  });

  threadWindow.loadFile(path.join(__dirname, "./app/empty.html"));

  ipcMain.on(Events.PROGRESS , (subEvent , message) => {
    event.reply(Events.PROGRESS , message);
  });

  ipcMain.on(Events.FINISHED, () =>{
    threadWindow.destroy();
  });

  ipcMain.on(Events.FAILED , () => {
    threadWindow.destroy();
    event.reply(Events.FAILED);
  });

  threadWindow.webContents.once('did-finish-load' , () => {

    threadWindow.webContents.send('crypto' , data);

  });

  threadWindow.on('closed', () => {
    event.reply(Events.FINISHED);

    ipcMain.removeAllListeners(Events.FAILED);
    ipcMain.removeAllListeners(Events.FINISHED);
    ipcMain.removeAllListeners(Events.PROGRESS);
    threadWindow = null;
  });

});


// Listener for the canceling the current operation 
ipcMain.on(Events.CANCELED , (event , args) => {
  
  //Simply terminates the current worker thread 
  if(threadWindow){
    threadWindow.destroy();
  }

});
