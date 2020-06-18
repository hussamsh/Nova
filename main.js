/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __webpack_require__(/*! electron */ "electron");
const path = __importStar(__webpack_require__(/*! path */ "path"));
const isDev = __webpack_require__(/*! electron-is-dev */ "electron-is-dev");
let mainWindow;
let threadWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "./dist/preload.js"),
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },
        width: 1200,
        height: 700,
        minWidth: 1200,
        minHeight: 700,
        frame: false,
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "./app/index.html"));
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    mainWindow.on('close', () => {
        if (threadWindow) {
            electron_1.ipcMain.removeAllListeners();
            threadWindow.removeAllListeners();
            threadWindow.destroy();
            threadWindow = null;
        }
    });
    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    electron_1.globalShortcut.register('CommandOrControl+R', function () {
        mainWindow.reload();
    });
    electron_1.globalShortcut.register('CommandOrControl+W', function () {
        mainWindow.close();
    });
    electron_1.globalShortcut.register('CommandOrControl+Shift+I', function () {
        mainWindow.webContents.openDevTools();
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
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
electron_1.ipcMain.on('select-dirs', (event, arg) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield electron_1.dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    if (result.filePaths.length != 0) {
        event.reply('folder-selected', result.filePaths[0]);
    }
}));
/*
  Listener for cryptographic operations - encrypt / decrypt .
*/
electron_1.ipcMain.on('crypto', (event, args) => {
    //Parameters that is unique to the current cryptographic algorithm
    //Restructure the input 
    let parameters = new Object();
    args["inputParams"].forEach((element) => {
        parameters[element.name] = element.value;
    });
    let data = {
        operation: args["operation"],
        algorithm: args["selectedAlgorithm"],
        parameters: parameters,
        imagePath: args["inputPath"],
        outputFolder: args["outputPath"],
        optimize: args["optimizeImage"]
    };
    threadWindow = new electron_1.BrowserWindow({
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
    electron_1.ipcMain.on('progress', (subEvent, message) => {
        event.reply('progress', message);
    });
    electron_1.ipcMain.on('image-written', () => {
        threadWindow.destroy();
    });
    electron_1.ipcMain.on('invalid-henon', () => {
        threadWindow.destroy();
        event.reply('invalid-henon');
    });
    threadWindow.webContents.once('did-finish-load', () => {
        threadWindow.webContents.send('crypto', data);
    });
    threadWindow.on('closed', () => {
        event.reply("finished");
        threadWindow = null;
    });
    // /* 
    //   Set 2 callbacks for cryptographic functions 
    //   1) First - is the onProgress which updates the progress of the current operation
    //   2) Second - is the onFinish which triggers that the operation has finsihed and the worker thread is idle and available
    // */
    // let onProgress = (progress : number) => {
    //   event.reply('progress' , progress);
    // };
    // let onFinish = () => {
    //   event.reply('finished');
    //   currentWorker.removeAllListeners('message');
    //   currentWorker.removeAllListeners('exit');
    //   currentWorker = null;
    // };
    //  //Parameters that is unique to the current cryptographic algorithm
    //  //Restructure the input 
    //  let parameters = new Object();
    //  args["inputParams"].forEach((element) => {
    //     parameters[element.name] = element.value;
    //  });
    // //Data needed for the worker thread module
    // let data = {
    //   workerData : {
    //     algorithm : args["selectedAlgorithm"],
    //     parameters : parameters,
    //     inputPath : args["inputPath"],
    //     outputFolder : args["outputPath"],
    //     optimize : args["optimizeImage"]
    //   }
    // };
    // //Check if current process is in the main thread - main.js is always on main thred but it's a good practice to check nevertheless 
    // if(isMainThread){
    //   //Check if the requested opeartion is encrypt or decrypt in order in instantiate the correct worker module 
    //   if(args["operation"] == "encrypt"){
    //     currentWorker = new Worker(getScriptsDir() + 'Encrypt.js', data);
    //   } else if (args["operation"] == "decrypt") {
    //     currentWorker = new Worker(getScriptsDir() + 'Decrypt.js', data);  
    //   }
    //   // Listeners for work progress / finish of the worker thread, each listener is tied to the corresponding callback defined above
    //   currentWorker.on('message' , data => {
    //       switch (data.type) {
    //         case "progress":
    //           onProgress(data.progress);            
    //           break;
    //         case "invalid-henon":
    //           event.reply('invalid-henon');
    //           break;
    //       }
    //   });
    //   currentWorker.on('exit' , code =>{
    //       onFinish();
    //   });
    // }
});
// Listener for the canceling the current operation 
electron_1.ipcMain.on('cancel', (event, args) => {
    //Simply terminates the current worker thread 
    if (threadWindow) {
        threadWindow.destroy();
    }
});
// Return scripts directory for each target platform
function getScriptsDir() {
    if (isDev) {
        return "./dist/";
    }
    else if (process.platform === "darwin") {
        return "./Contents/Resources/";
    }
    else {
        return "./resources/";
    }
}


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-is-dev":
/*!**********************************!*\
  !*** external "electron-is-dev" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-is-dev");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvbi1pcy1kZXZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxtRUFBK0U7QUFDL0UsbUVBQTZCO0FBQzdCLE1BQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsd0NBQWlCLENBQUMsQ0FBQztBQUV6QyxJQUFJLFVBQWtDLENBQUM7QUFDdkMsSUFBSSxZQUFxQyxDQUFDO0FBRTFDLFNBQVMsWUFBWTtJQUNuQiw2QkFBNkI7SUFDN0IsVUFBVSxHQUFHLElBQUksd0JBQWEsQ0FB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eUNBQXlDO0lBQ3pDLHVDQUF1QztJQUN2QyxNQUFNO0lBQ04sS0FBSztJQUVMLHFJQUFxSTtJQUNySSxvQkFBb0I7SUFFcEIsZ0hBQWdIO0lBQ2hILHdDQUF3QztJQUN4Qyx3RUFBd0U7SUFDeEUsaURBQWlEO0lBQ2pELDBFQUEwRTtJQUMxRSxNQUFNO0lBRU4sb0lBQW9JO0lBQ3BJLDJDQUEyQztJQUMzQyw2QkFBNkI7SUFDN0IsMkJBQTJCO0lBQzNCLG1EQUFtRDtJQUNuRCxtQkFBbUI7SUFDbkIsZ0NBQWdDO0lBQ2hDLDBDQUEwQztJQUMxQyxtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLFFBQVE7SUFFUix1Q0FBdUM7SUFDdkMsb0JBQW9CO0lBQ3BCLFFBQVE7SUFFUixJQUFJO0FBRU4sQ0FBQyxDQUFDLENBQUM7QUFHSCxvREFBb0Q7QUFDcEQsa0JBQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUMsS0FBSyxFQUFHLElBQUksRUFBRSxFQUFFO0lBRXJDLDhDQUE4QztJQUM5QyxJQUFHLFlBQVksRUFBQztRQUNkLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN4QjtBQUVILENBQUMsQ0FBQyxDQUFDO0FBR0gsb0RBQW9EO0FBQ3BELFNBQVMsYUFBYTtJQUVwQixJQUFJLEtBQUssRUFBRztRQUNWLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO1NBQU0sSUFBRyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBQztRQUN0QyxPQUFPLHVCQUF1QixDQUFDO0tBQ2hDO1NBQUk7UUFDSCxPQUFPLGNBQWMsQ0FBQztLQUN2QjtBQUVILENBQUM7Ozs7Ozs7Ozs7OztBQzFQRCxxQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdyAsIGdsb2JhbFNob3J0Y3V0LCBkaWFsb2csIGlwY01haW59IGZyb20gXCJlbGVjdHJvblwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmNvbnN0IGlzRGV2ID0gcmVxdWlyZSgnZWxlY3Ryb24taXMtZGV2Jyk7XHJcblxyXG5sZXQgbWFpbldpbmRvdzogRWxlY3Ryb24uQnJvd3NlcldpbmRvdztcclxubGV0IHRocmVhZFdpbmRvdyA6IEVsZWN0cm9uLkJyb3dzZXJXaW5kb3c7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVXaW5kb3coKSB7XHJcbiAgLy8gQ3JlYXRlIHRoZSBicm93c2VyIHdpbmRvdy5cclxuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xyXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcclxuICAgICAgcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuL2Rpc3QvcHJlbG9hZC5qc1wiKSxcclxuICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxyXG4gICAgICBub2RlSW50ZWdyYXRpb25JbldvcmtlcjogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHdpZHRoOiAxMjAwLFxyXG4gICAgaGVpZ2h0OiA3MDAsXHJcbiAgICBtaW5XaWR0aCA6IDEyMDAsXHJcbiAgICBtaW5IZWlnaHQgOiA3MDAsXHJcbiAgICBmcmFtZSA6IGZhbHNlLFxyXG4gIH0pO1xyXG5cclxuICAvLyBhbmQgbG9hZCB0aGUgaW5kZXguaHRtbCBvZiB0aGUgYXBwLlxyXG4gIG1haW5XaW5kb3cubG9hZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuL2FwcC9pbmRleC5odG1sXCIpKTtcclxuXHJcbiAgLy8gT3BlbiB0aGUgRGV2VG9vbHMuXHJcbiAgLy8gbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcclxuXHJcbiAgXHJcbiAgbWFpbldpbmRvdy5vbignY2xvc2UnICwgKCkgPT57XHJcbiAgICBcclxuICAgIGlmKHRocmVhZFdpbmRvdyl7XHJcbiAgICAgIGlwY01haW4ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbiAgICAgIHRocmVhZFdpbmRvdy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgICAgdGhyZWFkV2luZG93LmRlc3Ryb3koKTtcclxuICAgICAgdGhyZWFkV2luZG93ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgfSlcclxuICAvLyBFbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyBjbG9zZWQuXHJcbiAgbWFpbldpbmRvdy5vbihcImNsb3NlZFwiLCAoKSA9PiB7XHJcbiAgICAvLyBEZXJlZmVyZW5jZSB0aGUgd2luZG93IG9iamVjdCwgdXN1YWxseSB5b3Ugd291bGQgc3RvcmUgd2luZG93c1xyXG4gICAgLy8gaW4gYW4gYXJyYXkgaWYgeW91ciBhcHAgc3VwcG9ydHMgbXVsdGkgd2luZG93cywgdGhpcyBpcyB0aGUgdGltZVxyXG4gICAgLy8gd2hlbiB5b3Ugc2hvdWxkIGRlbGV0ZSB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50LlxyXG4gICAgXHJcbiAgICBtYWluV2luZG93ID0gbnVsbDtcclxuICB9KTtcclxuXHJcbiAgZ2xvYmFsU2hvcnRjdXQucmVnaXN0ZXIoJ0NvbW1hbmRPckNvbnRyb2wrUicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bWFpbldpbmRvdy5yZWxvYWQoKVxyXG4gIH0pXHJcbiAgXHJcbiAgZ2xvYmFsU2hvcnRjdXQucmVnaXN0ZXIoJ0NvbW1hbmRPckNvbnRyb2wrVycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bWFpbldpbmRvdy5jbG9zZSgpXHJcbiAgfSlcclxuICBcclxuICBnbG9iYWxTaG9ydGN1dC5yZWdpc3RlcignQ29tbWFuZE9yQ29udHJvbCtTaGlmdCtJJywgZnVuY3Rpb24oKSB7XHJcblx0XHRtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xyXG4gIH0pXHJcbn1cclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIHdoZW4gRWxlY3Ryb24gaGFzIGZpbmlzaGVkXHJcbi8vIGluaXRpYWxpemF0aW9uIGFuZCBpcyByZWFkeSB0byBjcmVhdGUgYnJvd3NlciB3aW5kb3dzLlxyXG4vLyBTb21lIEFQSXMgY2FuIG9ubHkgYmUgdXNlZCBhZnRlciB0aGlzIGV2ZW50IG9jY3Vycy5cclxuYXBwLm9uKFwicmVhZHlcIiwgY3JlYXRlV2luZG93KTtcclxuXHJcbi8vIFF1aXQgd2hlbiBhbGwgd2luZG93cyBhcmUgY2xvc2VkLlxyXG5hcHAub24oXCJ3aW5kb3ctYWxsLWNsb3NlZFwiLCAoKSA9PiB7XHJcbiAgLy8gT24gT1MgWCBpdCBpcyBjb21tb24gZm9yIGFwcGxpY2F0aW9ucyBhbmQgdGhlaXIgbWVudSBiYXJcclxuICAvLyB0byBzdGF5IGFjdGl2ZSB1bnRpbCB0aGUgdXNlciBxdWl0cyBleHBsaWNpdGx5IHdpdGggQ21kICsgUVxyXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSBcImRhcndpblwiKSB7XHJcbiAgICBhcHAucXVpdCgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5hcHAub24oXCJhY3RpdmF0ZVwiLCAoKSA9PiB7XHJcbiAgLy8gT24gT1MgWCBpdFwicyBjb21tb24gdG8gcmUtY3JlYXRlIGEgd2luZG93IGluIHRoZSBhcHAgd2hlbiB0aGVcclxuICAvLyBkb2NrIGljb24gaXMgY2xpY2tlZCBhbmQgdGhlcmUgYXJlIG5vIG90aGVyIHdpbmRvd3Mgb3Blbi5cclxuICBpZiAobWFpbldpbmRvdyA9PT0gbnVsbCkge1xyXG4gICAgY3JlYXRlV2luZG93KCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIEluIHRoaXMgZmlsZSB5b3UgY2FuIGluY2x1ZGUgdGhlIHJlc3Qgb2YgeW91ciBhcHBcInMgc3BlY2lmaWMgbWFpbiBwcm9jZXNzXHJcbi8vIGNvZGUuIFlvdSBjYW4gYWxzbyBwdXQgdGhlbSBpbiBzZXBhcmF0ZSBmaWxlcyBhbmQgcmVxdWlyZSB0aGVtIGhlcmUuXHJcblxyXG5cclxuLypcclxuICBMaXN0ZW5lciBmb3Igb3BlbmluZyBhIGRpcmVjdG9yeSBzZWxlY3Rpb24gdG8gc2F2ZSB0aGUgb3V0cHV0IGZpbGUgaW5cclxuKi9cclxuaXBjTWFpbi5vbignc2VsZWN0LWRpcnMnLCBhc3luYyAoZXZlbnQsIGFyZykgPT4ge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRpYWxvZy5zaG93T3BlbkRpYWxvZyhtYWluV2luZG93LCB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbJ29wZW5EaXJlY3RvcnknXVxyXG4gIH0pXHJcblxyXG4gIGlmKHJlc3VsdC5maWxlUGF0aHMubGVuZ3RoICE9IDApe1xyXG4gICAgZXZlbnQucmVwbHkoJ2ZvbGRlci1zZWxlY3RlZCcgLCByZXN1bHQuZmlsZVBhdGhzWzBdKTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gIExpc3RlbmVyIGZvciBjcnlwdG9ncmFwaGljIG9wZXJhdGlvbnMgLSBlbmNyeXB0IC8gZGVjcnlwdCAuXHJcbiovXHJcbmlwY01haW4ub24oJ2NyeXB0bycgLCAoZXZlbnQgLCBhcmdzKSA9PiB7XHJcbiAgXHJcbiAgICAvL1BhcmFtZXRlcnMgdGhhdCBpcyB1bmlxdWUgdG8gdGhlIGN1cnJlbnQgY3J5cHRvZ3JhcGhpYyBhbGdvcml0aG1cclxuICAgIC8vUmVzdHJ1Y3R1cmUgdGhlIGlucHV0IFxyXG4gICBsZXQgcGFyYW1ldGVycyA9IG5ldyBPYmplY3QoKTtcclxuICAgYXJnc1tcImlucHV0UGFyYW1zXCJdLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgcGFyYW1ldGVyc1tlbGVtZW50Lm5hbWVdID0gZWxlbWVudC52YWx1ZTtcclxuICAgfSk7XHJcblxyXG4gIGxldCBkYXRhID0ge1xyXG4gICAgICBvcGVyYXRpb24gOiBhcmdzW1wib3BlcmF0aW9uXCJdLFxyXG4gICAgICBhbGdvcml0aG0gOiBhcmdzW1wic2VsZWN0ZWRBbGdvcml0aG1cIl0sXHJcbiAgICAgIHBhcmFtZXRlcnMgOiBwYXJhbWV0ZXJzLFxyXG4gICAgICBpbWFnZVBhdGggOiBhcmdzW1wiaW5wdXRQYXRoXCJdLFxyXG4gICAgICBvdXRwdXRGb2xkZXIgOiBhcmdzW1wib3V0cHV0UGF0aFwiXSxcclxuICAgICAgb3B0aW1pemUgOiBhcmdzW1wib3B0aW1pemVJbWFnZVwiXVxyXG4gIH07XHJcbiAgXHJcbiAgdGhyZWFkV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xyXG4gICAgc2hvdzogZmFsc2UsXHJcbiAgICBwYXJlbnQ6IG1haW5XaW5kb3csXHJcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xyXG4gICAgICAgIHByZWxvYWQ6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi9kaXN0L3ByZWxvYWQuanNcIiksXHJcbiAgICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxyXG4gICAgICAgIG5vZGVJbnRlZ3JhdGlvbkluV29ya2VyOiB0cnVlLFxyXG4gICAgICAgIG5vZGVJbnRlZ3JhdGlvbkluU3ViRnJhbWVzOiB0cnVlLFxyXG4gICAgICAgIGRldlRvb2xzOiB0cnVlLFxyXG4gICAgICAgIGJhY2tncm91bmRUaHJvdHRsaW5nOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB0aHJlYWRXaW5kb3cubG9hZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuL2FwcC9lbXB0eS5odG1sXCIpKTtcclxuXHJcbiAgaXBjTWFpbi5vbigncHJvZ3Jlc3MnICwgKHN1YkV2ZW50ICwgbWVzc2FnZSkgPT4ge1xyXG4gICAgZXZlbnQucmVwbHkoJ3Byb2dyZXNzJyAsIG1lc3NhZ2UpO1xyXG4gIH0pO1xyXG5cclxuICBpcGNNYWluLm9uKCdpbWFnZS13cml0dGVuJywgKCkgPT57XHJcbiAgICB0aHJlYWRXaW5kb3cuZGVzdHJveSgpO1xyXG4gIH0pO1xyXG5cclxuICBpcGNNYWluLm9uKCdpbnZhbGlkLWhlbm9uJyAsICgpID0+IHtcclxuICAgIHRocmVhZFdpbmRvdy5kZXN0cm95KCk7XHJcbiAgICBldmVudC5yZXBseSgnaW52YWxpZC1oZW5vbicpO1xyXG4gIH0pO1xyXG5cclxuICB0aHJlYWRXaW5kb3cud2ViQ29udGVudHMub25jZSgnZGlkLWZpbmlzaC1sb2FkJyAsICgpID0+IHtcclxuXHJcbiAgICB0aHJlYWRXaW5kb3cud2ViQ29udGVudHMuc2VuZCgnY3J5cHRvJyAsIGRhdGEpO1xyXG5cclxuICB9KTtcclxuXHJcbiAgdGhyZWFkV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XHJcbiAgICBldmVudC5yZXBseShcImZpbmlzaGVkXCIpO1xyXG4gICAgdGhyZWFkV2luZG93ID0gbnVsbDtcclxuICB9KTtcclxuXHJcblxyXG4gIC8vIC8qIFxyXG4gIC8vICAgU2V0IDIgY2FsbGJhY2tzIGZvciBjcnlwdG9ncmFwaGljIGZ1bmN0aW9ucyBcclxuICAvLyAgIDEpIEZpcnN0IC0gaXMgdGhlIG9uUHJvZ3Jlc3Mgd2hpY2ggdXBkYXRlcyB0aGUgcHJvZ3Jlc3Mgb2YgdGhlIGN1cnJlbnQgb3BlcmF0aW9uXHJcbiAgLy8gICAyKSBTZWNvbmQgLSBpcyB0aGUgb25GaW5pc2ggd2hpY2ggdHJpZ2dlcnMgdGhhdCB0aGUgb3BlcmF0aW9uIGhhcyBmaW5zaWhlZCBhbmQgdGhlIHdvcmtlciB0aHJlYWQgaXMgaWRsZSBhbmQgYXZhaWxhYmxlXHJcbiAgLy8gKi9cclxuICAvLyBsZXQgb25Qcm9ncmVzcyA9IChwcm9ncmVzcyA6IG51bWJlcikgPT4ge1xyXG4gIC8vICAgZXZlbnQucmVwbHkoJ3Byb2dyZXNzJyAsIHByb2dyZXNzKTtcclxuICAvLyB9O1xyXG5cclxuICAvLyBsZXQgb25GaW5pc2ggPSAoKSA9PiB7XHJcbiAgLy8gICBldmVudC5yZXBseSgnZmluaXNoZWQnKTtcclxuICAvLyAgIGN1cnJlbnRXb3JrZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdtZXNzYWdlJyk7XHJcbiAgLy8gICBjdXJyZW50V29ya2VyLnJlbW92ZUFsbExpc3RlbmVycygnZXhpdCcpO1xyXG4gIC8vICAgY3VycmVudFdvcmtlciA9IG51bGw7XHJcbiAgLy8gfTtcclxuXHJcbiAgLy8gIC8vUGFyYW1ldGVycyB0aGF0IGlzIHVuaXF1ZSB0byB0aGUgY3VycmVudCBjcnlwdG9ncmFwaGljIGFsZ29yaXRobVxyXG4gIC8vICAvL1Jlc3RydWN0dXJlIHRoZSBpbnB1dCBcclxuICAvLyAgbGV0IHBhcmFtZXRlcnMgPSBuZXcgT2JqZWN0KCk7XHJcbiAgLy8gIGFyZ3NbXCJpbnB1dFBhcmFtc1wiXS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgLy8gICAgIHBhcmFtZXRlcnNbZWxlbWVudC5uYW1lXSA9IGVsZW1lbnQudmFsdWU7XHJcbiAgLy8gIH0pO1xyXG5cclxuICAvLyAvL0RhdGEgbmVlZGVkIGZvciB0aGUgd29ya2VyIHRocmVhZCBtb2R1bGVcclxuICAvLyBsZXQgZGF0YSA9IHtcclxuICAvLyAgIHdvcmtlckRhdGEgOiB7XHJcbiAgLy8gICAgIGFsZ29yaXRobSA6IGFyZ3NbXCJzZWxlY3RlZEFsZ29yaXRobVwiXSxcclxuICAvLyAgICAgcGFyYW1ldGVycyA6IHBhcmFtZXRlcnMsXHJcbiAgLy8gICAgIGlucHV0UGF0aCA6IGFyZ3NbXCJpbnB1dFBhdGhcIl0sXHJcbiAgLy8gICAgIG91dHB1dEZvbGRlciA6IGFyZ3NbXCJvdXRwdXRQYXRoXCJdLFxyXG4gIC8vICAgICBvcHRpbWl6ZSA6IGFyZ3NbXCJvcHRpbWl6ZUltYWdlXCJdXHJcbiAgLy8gICB9XHJcbiAgLy8gfTtcclxuXHJcbiAgLy8gLy9DaGVjayBpZiBjdXJyZW50IHByb2Nlc3MgaXMgaW4gdGhlIG1haW4gdGhyZWFkIC0gbWFpbi5qcyBpcyBhbHdheXMgb24gbWFpbiB0aHJlZCBidXQgaXQncyBhIGdvb2QgcHJhY3RpY2UgdG8gY2hlY2sgbmV2ZXJ0aGVsZXNzIFxyXG4gIC8vIGlmKGlzTWFpblRocmVhZCl7XHJcblxyXG4gIC8vICAgLy9DaGVjayBpZiB0aGUgcmVxdWVzdGVkIG9wZWFydGlvbiBpcyBlbmNyeXB0IG9yIGRlY3J5cHQgaW4gb3JkZXIgaW4gaW5zdGFudGlhdGUgdGhlIGNvcnJlY3Qgd29ya2VyIG1vZHVsZSBcclxuICAvLyAgIGlmKGFyZ3NbXCJvcGVyYXRpb25cIl0gPT0gXCJlbmNyeXB0XCIpe1xyXG4gIC8vICAgICBjdXJyZW50V29ya2VyID0gbmV3IFdvcmtlcihnZXRTY3JpcHRzRGlyKCkgKyAnRW5jcnlwdC5qcycsIGRhdGEpO1xyXG4gIC8vICAgfSBlbHNlIGlmIChhcmdzW1wib3BlcmF0aW9uXCJdID09IFwiZGVjcnlwdFwiKSB7XHJcbiAgLy8gICAgIGN1cnJlbnRXb3JrZXIgPSBuZXcgV29ya2VyKGdldFNjcmlwdHNEaXIoKSArICdEZWNyeXB0LmpzJywgZGF0YSk7ICBcclxuICAvLyAgIH1cclxuXHJcbiAgLy8gICAvLyBMaXN0ZW5lcnMgZm9yIHdvcmsgcHJvZ3Jlc3MgLyBmaW5pc2ggb2YgdGhlIHdvcmtlciB0aHJlYWQsIGVhY2ggbGlzdGVuZXIgaXMgdGllZCB0byB0aGUgY29ycmVzcG9uZGluZyBjYWxsYmFjayBkZWZpbmVkIGFib3ZlXHJcbiAgLy8gICBjdXJyZW50V29ya2VyLm9uKCdtZXNzYWdlJyAsIGRhdGEgPT4ge1xyXG4gIC8vICAgICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XHJcbiAgLy8gICAgICAgICBjYXNlIFwicHJvZ3Jlc3NcIjpcclxuICAvLyAgICAgICAgICAgb25Qcm9ncmVzcyhkYXRhLnByb2dyZXNzKTsgICAgICAgICAgICBcclxuICAvLyAgICAgICAgICAgYnJlYWs7XHJcbiAgLy8gICAgICAgICBjYXNlIFwiaW52YWxpZC1oZW5vblwiOlxyXG4gIC8vICAgICAgICAgICBldmVudC5yZXBseSgnaW52YWxpZC1oZW5vbicpO1xyXG4gIC8vICAgICAgICAgICBicmVhaztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gICBjdXJyZW50V29ya2VyLm9uKCdleGl0JyAsIGNvZGUgPT57XHJcbiAgLy8gICAgICAgb25GaW5pc2goKTtcclxuICAvLyAgIH0pO1xyXG5cclxuICAvLyB9XHJcblxyXG59KTtcclxuXHJcblxyXG4vLyBMaXN0ZW5lciBmb3IgdGhlIGNhbmNlbGluZyB0aGUgY3VycmVudCBvcGVyYXRpb24gXHJcbmlwY01haW4ub24oJ2NhbmNlbCcgLCAoZXZlbnQgLCBhcmdzKSA9PiB7XHJcbiAgXHJcbiAgLy9TaW1wbHkgdGVybWluYXRlcyB0aGUgY3VycmVudCB3b3JrZXIgdGhyZWFkIFxyXG4gIGlmKHRocmVhZFdpbmRvdyl7XHJcbiAgICB0aHJlYWRXaW5kb3cuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vIFJldHVybiBzY3JpcHRzIGRpcmVjdG9yeSBmb3IgZWFjaCB0YXJnZXQgcGxhdGZvcm1cclxuZnVuY3Rpb24gZ2V0U2NyaXB0c0Rpcigpe1xyXG5cclxuICBpZiggaXNEZXYgKSB7XHJcbiAgICByZXR1cm4gXCIuL2Rpc3QvXCI7XHJcbiAgfSBlbHNlIGlmKHByb2Nlc3MucGxhdGZvcm0gPT09IFwiZGFyd2luXCIpe1xyXG4gICAgcmV0dXJuIFwiLi9Db250ZW50cy9SZXNvdXJjZXMvXCI7XHJcbiAgfWVsc2V7XHJcbiAgICByZXR1cm4gXCIuL3Jlc291cmNlcy9cIjtcclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uLWlzLWRldlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=