import { app, BrowserWindow , globalShortcut, dialog, ipcMain} from "electron";
import * as path from "path";
const { Worker, isMainThread } = require('worker_threads');

let mainWindow: Electron.BrowserWindow;
let currentWorker;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    width: 1200,
    height: 700,
    minWidth : 1100,
    minHeight : 700,
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

  /* 
    Set 2 callbacks for cryptographic functions 
    1) First - is the onProgress which updates the progress of the current operation
    2) Second - is the onFinish which triggers that the operation has finsihed and the worker thread is idle and available
  */
  let onProgress = (progress : number) => {
    event.reply('progress' , progress);
  };

  let onFinish = () => {
    event.reply('finished');
  };

   //Parameters that is unique to the current cryptographic algorithm
   //Restructure the input 
   let parameters = new Object();
   args["inputParams"].forEach((element) => {
      parameters[element.name] = element.value;
   });

  //Data needed for the worker thread module
  let data = {
    workerData : {
      algorithm : args["selectedAlgorithm"],
      parameters : parameters,
      inputPath : args["inputPath"],
      outputFolder : args["outputPath"]
    }
  };

  //Check if current process is in the main thread - main.js is always on main thred but it's a good practice to check nevertheless 
  if(isMainThread){

    //Check if the requested opeartion is encrypt or decrypt in order in instantiate the correct worker module 
    if(args["operation"] == "encrypt"){
      currentWorker = new Worker('./dist/Encrypt.js', data);
    } else if (args["operation"] == "decrypt") {
      currentWorker = new Worker('./dist/Decrypt.js', data);  
    }

    // Listeners for work progress / finish of the worker thread, each listener is tied to the corresponding callback defined above
    currentWorker.on('message' , data => {
        onProgress(data.progress);
    });

    currentWorker.on('exit' , code =>{
        onFinish();
    });

  }

});


// Listener for the canceling the current operation 
ipcMain.on('cancel' , (event , args) => {
  
    //Simply terminates the current worker thread 

    if(currentWorker){
      currentWorker.terminate();
    }

});
