import { app, BrowserWindow , globalShortcut, dialog, ipcMain} from "electron";
import * as path from "path";
import EncryptionTypes from "./nova/EncryptionTypes";
const { Worker, isMainThread } = require('worker_threads');

let mainWindow: Electron.BrowserWindow;
let currentWorker;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    width: 1000,
    frame : false
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../app/index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


  globalShortcut.register('CommandOrControl+R', function() {
		mainWindow.reload()
  })
  
  globalShortcut.register('CommandOrControl+W', function() {
		mainWindow.close()
  })
  
  globalShortcut.register('CommandOrControl+Shift+I', function() {
		mainWindow.webContents.openDevTools();
  })

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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


ipcMain.on('select-dirs', async (event, arg) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })

  if(result.filePaths.length != 0){
    event.reply('folder-selected' , result.filePaths[0]);
  }

});


ipcMain.on('encrypt-image' , (event , args) => {

  if(args["selectedAlgorithm"] == EncryptionTypes.DH.getName()){

    let params = args["inputParams"];
    
    let onProgress = (progress : number) => {
      event.reply('progress' , progress);
    };

    let onFinish = () => {
      event.reply('finished');
    };

    //Encrypt
    if(isMainThread){

      currentWorker = new Worker('./dist/Encrypt.js', {workerData : {
          growthRate : params[0].value,
          initialCondition : params[1].value,
          generalizationParam : params[2].value,
          inputPath : args["inputPath"],
          outputPath : args["outputPath"]
      }});


      currentWorker.on('message' , data => {
          onProgress(data.progress);
      });

      currentWorker.on('exit' , code =>{
          onFinish();
      });

    }

  }

});

ipcMain.on('decrypt-image' , (event , args) => {

  if(args["selectedAlgorithm"] == EncryptionTypes.DH.getName()){

    let params = args["inputParams"];

    let onProgress = (progress : number) => {
      event.reply('progress' , progress);
    };

    let onFinish = () => {
      event.reply('finished');
    };

    if(isMainThread){

      currentWorker = new Worker('./dist/Decrypt.js', {workerData : {
          growthRate : params[0].value,
          initialCondition : params[1].value,
          generalizationParam : params[2].value,
          inputPath :  args["inputPath"] ,
          outputPath :  args["outputPath"]
      }});
      
      currentWorker.on('message' , data => {
          onProgress(data.progress);
      });
      
      currentWorker.on('exit' , code =>{
          onFinish();
      });
   }
  }

});



ipcMain.on('cancel' , (event , args) => {
    
    if(currentWorker){
      currentWorker.terminate();
      console.log("Canceled");
    }

});
