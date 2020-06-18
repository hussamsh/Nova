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
const { Worker, isMainThread } = __webpack_require__(/*! worker_threads */ "worker_threads");
const isDev = __webpack_require__(/*! electron-is-dev */ "electron-is-dev");
let mainWindow;
let currentWorker;
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
electron_1.app.on('before-quit', (event) => {
    if (currentWorker) {
        currentWorker.removeAllListeners('message');
        currentWorker.removeAllListeners('exit');
        currentWorker.terminate();
    }
});
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
    // threadWindow = new BrowserWindow({
    //   show: false,
    //   parent: mainWindow,
    //   webPreferences: {
    //       preload: path.join(__dirname, "./dist/preload.js"),
    //       nodeIntegration: true,
    //       nodeIntegrationInWorker: true,
    //       nodeIntegrationInSubFrames: true,
    //       devTools: false,
    //       backgroundThrottling: false
    //   }
    // });
    /*
      Set 2 callbacks for cryptographic functions
      1) First - is the onProgress which updates the progress of the current operation
      2) Second - is the onFinish which triggers that the operation has finsihed and the worker thread is idle and available
    */
    let onProgress = (progress) => {
        event.reply('progress', progress);
    };
    let onFinish = () => {
        event.reply('finished');
        currentWorker.removeAllListeners('message');
        currentWorker.removeAllListeners('exit');
        currentWorker = null;
    };
    //Parameters that is unique to the current cryptographic algorithm
    //Restructure the input 
    let parameters = new Object();
    args["inputParams"].forEach((element) => {
        parameters[element.name] = element.value;
    });
    //Data needed for the worker thread module
    let data = {
        workerData: {
            algorithm: args["selectedAlgorithm"],
            parameters: parameters,
            inputPath: args["inputPath"],
            outputFolder: args["outputPath"],
            optimize: args["optimizeImage"]
        }
    };
    //Check if current process is in the main thread - main.js is always on main thred but it's a good practice to check nevertheless 
    if (isMainThread) {
        //Check if the requested opeartion is encrypt or decrypt in order in instantiate the correct worker module 
        if (args["operation"] == "encrypt") {
            currentWorker = new Worker(getScriptsDir() + 'Encrypt.js', data);
        }
        else if (args["operation"] == "decrypt") {
            currentWorker = new Worker(getScriptsDir() + 'Decrypt.js', data);
        }
        // Listeners for work progress / finish of the worker thread, each listener is tied to the corresponding callback defined above
        currentWorker.on('message', data => {
            switch (data.type) {
                case "progress":
                    onProgress(data.progress);
                    break;
                case "invalid-henon":
                    event.reply('invalid-henon');
                    break;
            }
        });
        currentWorker.on('exit', code => {
            onFinish();
        });
    }
});
// Listener for the canceling the current operation 
electron_1.ipcMain.on('cancel', (event, args) => {
    //Simply terminates the current worker thread 
    if (currentWorker) {
        currentWorker.terminate();
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

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("worker_threads");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvbi1pcy1kZXZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid29ya2VyX3RocmVhZHNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLG1FQUErRTtBQUMvRSxtRUFBNkI7QUFDN0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxtQkFBTyxDQUFDLHNDQUFnQixDQUFDLENBQUM7QUFDM0QsTUFBTSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyx3Q0FBaUIsQ0FB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QUFLLEVBQUcsSUFBSSxFQUFFLEVBQUU7SUFFbkMsOENBQThDO0lBRTlDLElBQUcsYUFBYSxFQUFDO1FBQ2YsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQzNCO0FBRUwsQ0FBQyxDQUFDLENBQUM7QUFHSCxvREFBb0Q7QUFDcEQsU0FBUyxhQUFhO0lBRXBCLElBQUksS0FBSyxFQUFHO1FBQ1YsT0FBTyxTQUFTLENBQUM7S0FDbEI7U0FBTSxJQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFDO1FBQ3RDLE9BQU8sdUJBQXVCLENBQUM7S0FDaEM7U0FBSTtRQUNILE9BQU8sY0FBYyxDQUFDO0tBQ3ZCO0FBRUgsQ0FBQzs7Ozs7Ozs7Ozs7O0FDMU5ELHFDOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLDJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiaW1wb3J0IHsgYXBwLCBCcm93c2VyV2luZG93ICwgZ2xvYmFsU2hvcnRjdXQsIGRpYWxvZywgaXBjTWFpbn0gZnJvbSBcImVsZWN0cm9uXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuY29uc3QgeyBXb3JrZXIsIGlzTWFpblRocmVhZCB9ID0gcmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKTtcclxuY29uc3QgaXNEZXYgPSByZXF1aXJlKCdlbGVjdHJvbi1pcy1kZXYnKTtcclxuXHJcbmxldCBtYWluV2luZG93OiBFbGVjdHJvbi5Ccm93c2VyV2luZG93O1xyXG5sZXQgY3VycmVudFdvcmtlcjtcclxuXHJcblxyXG5sZXQgdGhyZWFkV2luZG93IDogRWxlY3Ryb24uQnJvd3NlcldpbmRvdztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVdpbmRvdygpIHtcclxuICAvLyBDcmVhdGUgdGhlIGJyb3dzZXIgd2luZG93LlxyXG4gIG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XHJcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xyXG4gICAgICBwcmVsb2FkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4vZGlzdC9wcmVsb2FkLmpzXCIpLFxyXG4gICAgICBub2RlSW50ZWdyYXRpb246IHRydWUsXHJcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbkluV29ya2VyOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgd2lkdGg6IDEyMDAsXHJcbiAgICBoZWlnaHQ6IDcwMCxcclxuICAgIG1pbldpZHRoIDogMTIwMCxcclxuICAgIG1pbkhlaWdodCA6IDcwMCxcclxuICAgIGZyYW1lIDogZmFsc2UsXHJcbiAgfSk7XHJcblxyXG4gIC8vIGFuZCBsb2FkIHRoZSBpbmRleC5odG1sIG9mIHRoZSBhcHAuXHJcbiAgbWFpbldpbmRvdy5sb2FkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4vYXBwL2luZGV4Lmh0bWxcIikpO1xyXG5cclxuICAvLyBPcGVuIHRoZSBEZXZUb29scy5cclxuICAvLyBtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xyXG5cclxuICAvLyBFbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyBjbG9zZWQuXHJcbiAgbWFpbldpbmRvdy5vbihcImNsb3NlZFwiLCAoKSA9PiB7XHJcbiAgICAvLyBEZXJlZmVyZW5jZSB0aGUgd2luZG93IG9iamVjdCwgdXN1YWxseSB5b3Ugd291bGQgc3RvcmUgd2luZG93c1xyXG4gICAgLy8gaW4gYW4gYXJyYXkgaWYgeW91ciBhcHAgc3VwcG9ydHMgbXVsdGkgd2luZG93cywgdGhpcyBpcyB0aGUgdGltZVxyXG4gICAgLy8gd2hlbiB5b3Ugc2hvdWxkIGRlbGV0ZSB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50LlxyXG4gICAgbWFpbldpbmRvdyA9IG51bGw7XHJcbiAgfSk7XHJcblxyXG4gIGdsb2JhbFNob3J0Y3V0LnJlZ2lzdGVyKCdDb21tYW5kT3JDb250cm9sK1InLCBmdW5jdGlvbigpIHtcclxuXHRcdG1haW5XaW5kb3cucmVsb2FkKClcclxuICB9KVxyXG4gIFxyXG4gIGdsb2JhbFNob3J0Y3V0LnJlZ2lzdGVyKCdDb21tYW5kT3JDb250cm9sK1cnLCBmdW5jdGlvbigpIHtcclxuXHRcdG1haW5XaW5kb3cuY2xvc2UoKVxyXG4gIH0pXHJcbiAgXHJcbiAgZ2xvYmFsU2hvcnRjdXQucmVnaXN0ZXIoJ0NvbW1hbmRPckNvbnRyb2wrU2hpZnQrSScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcclxuICB9KVxyXG59XHJcblxyXG4vLyBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aGVuIEVsZWN0cm9uIGhhcyBmaW5pc2hlZFxyXG4vLyBpbml0aWFsaXphdGlvbiBhbmQgaXMgcmVhZHkgdG8gY3JlYXRlIGJyb3dzZXIgd2luZG93cy5cclxuLy8gU29tZSBBUElzIGNhbiBvbmx5IGJlIHVzZWQgYWZ0ZXIgdGhpcyBldmVudCBvY2N1cnMuXHJcbmFwcC5vbihcInJlYWR5XCIsIGNyZWF0ZVdpbmRvdyk7XHJcblxyXG5hcHAub24oJ2JlZm9yZS1xdWl0JyAsIChldmVudCkgPT4ge1xyXG4gIGlmKGN1cnJlbnRXb3JrZXIpe1xyXG4gICAgY3VycmVudFdvcmtlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ21lc3NhZ2UnKTtcclxuICAgIGN1cnJlbnRXb3JrZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdleGl0Jyk7XHJcbiAgICBjdXJyZW50V29ya2VyLnRlcm1pbmF0ZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBRdWl0IHdoZW4gYWxsIHdpbmRvd3MgYXJlIGNsb3NlZC5cclxuYXBwLm9uKFwid2luZG93LWFsbC1jbG9zZWRcIiwgKCkgPT4ge1xyXG4gIC8vIE9uIE9TIFggaXQgaXMgY29tbW9uIGZvciBhcHBsaWNhdGlvbnMgYW5kIHRoZWlyIG1lbnUgYmFyXHJcbiAgLy8gdG8gc3RheSBhY3RpdmUgdW50aWwgdGhlIHVzZXIgcXVpdHMgZXhwbGljaXRseSB3aXRoIENtZCArIFFcclxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gXCJkYXJ3aW5cIikge1xyXG4gICAgYXBwLnF1aXQoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuYXBwLm9uKFwiYWN0aXZhdGVcIiwgKCkgPT4ge1xyXG4gIC8vIE9uIE9TIFggaXRcInMgY29tbW9uIHRvIHJlLWNyZWF0ZSBhIHdpbmRvdyBpbiB0aGUgYXBwIHdoZW4gdGhlXHJcbiAgLy8gZG9jayBpY29uIGlzIGNsaWNrZWQgYW5kIHRoZXJlIGFyZSBubyBvdGhlciB3aW5kb3dzIG9wZW4uXHJcbiAgaWYgKG1haW5XaW5kb3cgPT09IG51bGwpIHtcclxuICAgIGNyZWF0ZVdpbmRvdygpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBJbiB0aGlzIGZpbGUgeW91IGNhbiBpbmNsdWRlIHRoZSByZXN0IG9mIHlvdXIgYXBwXCJzIHNwZWNpZmljIG1haW4gcHJvY2Vzc1xyXG4vLyBjb2RlLiBZb3UgY2FuIGFsc28gcHV0IHRoZW0gaW4gc2VwYXJhdGUgZmlsZXMgYW5kIHJlcXVpcmUgdGhlbSBoZXJlLlxyXG5cclxuXHJcbi8qXHJcbiAgTGlzdGVuZXIgZm9yIG9wZW5pbmcgYSBkaXJlY3Rvcnkgc2VsZWN0aW9uIHRvIHNhdmUgdGhlIG91dHB1dCBmaWxlIGluXHJcbiovXHJcbmlwY01haW4ub24oJ3NlbGVjdC1kaXJzJywgYXN5bmMgKGV2ZW50LCBhcmcpID0+IHtcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBkaWFsb2cuc2hvd09wZW5EaWFsb2cobWFpbldpbmRvdywge1xyXG4gICAgcHJvcGVydGllczogWydvcGVuRGlyZWN0b3J5J11cclxuICB9KVxyXG5cclxuICBpZihyZXN1bHQuZmlsZVBhdGhzLmxlbmd0aCAhPSAwKXtcclxuICAgIGV2ZW50LnJlcGx5KCdmb2xkZXItc2VsZWN0ZWQnICwgcmVzdWx0LmZpbGVQYXRoc1swXSk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuLypcclxuICBMaXN0ZW5lciBmb3IgY3J5cHRvZ3JhcGhpYyBvcGVyYXRpb25zIC0gZW5jcnlwdCAvIGRlY3J5cHQgLlxyXG4qL1xyXG5pcGNNYWluLm9uKCdjcnlwdG8nICwgKGV2ZW50ICwgYXJncykgPT4ge1xyXG5cclxuICAvLyB0aHJlYWRXaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XHJcbiAgLy8gICBzaG93OiBmYWxzZSxcclxuICAvLyAgIHBhcmVudDogbWFpbldpbmRvdyxcclxuICAvLyAgIHdlYlByZWZlcmVuY2VzOiB7XHJcbiAgLy8gICAgICAgcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuL2Rpc3QvcHJlbG9hZC5qc1wiKSxcclxuICAvLyAgICAgICBub2RlSW50ZWdyYXRpb246IHRydWUsXHJcbiAgLy8gICAgICAgbm9kZUludGVncmF0aW9uSW5Xb3JrZXI6IHRydWUsXHJcbiAgLy8gICAgICAgbm9kZUludGVncmF0aW9uSW5TdWJGcmFtZXM6IHRydWUsXHJcbiAgLy8gICAgICAgZGV2VG9vbHM6IGZhbHNlLFxyXG4gIC8vICAgICAgIGJhY2tncm91bmRUaHJvdHRsaW5nOiBmYWxzZVxyXG4gIC8vICAgfVxyXG4gIC8vIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgLyogXHJcbiAgICBTZXQgMiBjYWxsYmFja3MgZm9yIGNyeXB0b2dyYXBoaWMgZnVuY3Rpb25zIFxyXG4gICAgMSkgRmlyc3QgLSBpcyB0aGUgb25Qcm9ncmVzcyB3aGljaCB1cGRhdGVzIHRoZSBwcm9ncmVzcyBvZiB0aGUgY3VycmVudCBvcGVyYXRpb25cclxuICAgIDIpIFNlY29uZCAtIGlzIHRoZSBvbkZpbmlzaCB3aGljaCB0cmlnZ2VycyB0aGF0IHRoZSBvcGVyYXRpb24gaGFzIGZpbnNpaGVkIGFuZCB0aGUgd29ya2VyIHRocmVhZCBpcyBpZGxlIGFuZCBhdmFpbGFibGVcclxuICAqL1xyXG4gIGxldCBvblByb2dyZXNzID0gKHByb2dyZXNzIDogbnVtYmVyKSA9PiB7XHJcbiAgICBldmVudC5yZXBseSgncHJvZ3Jlc3MnICwgcHJvZ3Jlc3MpO1xyXG4gIH07XHJcblxyXG4gIGxldCBvbkZpbmlzaCA9ICgpID0+IHtcclxuICAgIGV2ZW50LnJlcGx5KCdmaW5pc2hlZCcpO1xyXG4gICAgY3VycmVudFdvcmtlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ21lc3NhZ2UnKTtcclxuICAgIGN1cnJlbnRXb3JrZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdleGl0Jyk7XHJcbiAgICBjdXJyZW50V29ya2VyID0gbnVsbDtcclxuICB9O1xyXG5cclxuICAgLy9QYXJhbWV0ZXJzIHRoYXQgaXMgdW5pcXVlIHRvIHRoZSBjdXJyZW50IGNyeXB0b2dyYXBoaWMgYWxnb3JpdGhtXHJcbiAgIC8vUmVzdHJ1Y3R1cmUgdGhlIGlucHV0IFxyXG4gICBsZXQgcGFyYW1ldGVycyA9IG5ldyBPYmplY3QoKTtcclxuICAgYXJnc1tcImlucHV0UGFyYW1zXCJdLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgcGFyYW1ldGVyc1tlbGVtZW50Lm5hbWVdID0gZWxlbWVudC52YWx1ZTtcclxuICAgfSk7XHJcblxyXG4gIC8vRGF0YSBuZWVkZWQgZm9yIHRoZSB3b3JrZXIgdGhyZWFkIG1vZHVsZVxyXG4gIGxldCBkYXRhID0ge1xyXG4gICAgd29ya2VyRGF0YSA6IHtcclxuICAgICAgYWxnb3JpdGhtIDogYXJnc1tcInNlbGVjdGVkQWxnb3JpdGhtXCJdLFxyXG4gICAgICBwYXJhbWV0ZXJzIDogcGFyYW1ldGVycyxcclxuICAgICAgaW5wdXRQYXRoIDogYXJnc1tcImlucHV0UGF0aFwiXSxcclxuICAgICAgb3V0cHV0Rm9sZGVyIDogYXJnc1tcIm91dHB1dFBhdGhcIl0sXHJcbiAgICAgIG9wdGltaXplIDogYXJnc1tcIm9wdGltaXplSW1hZ2VcIl1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvL0NoZWNrIGlmIGN1cnJlbnQgcHJvY2VzcyBpcyBpbiB0aGUgbWFpbiB0aHJlYWQgLSBtYWluLmpzIGlzIGFsd2F5cyBvbiBtYWluIHRocmVkIGJ1dCBpdCdzIGEgZ29vZCBwcmFjdGljZSB0byBjaGVjayBuZXZlcnRoZWxlc3MgXHJcbiAgaWYoaXNNYWluVGhyZWFkKXtcclxuXHJcbiAgICAvL0NoZWNrIGlmIHRoZSByZXF1ZXN0ZWQgb3BlYXJ0aW9uIGlzIGVuY3J5cHQgb3IgZGVjcnlwdCBpbiBvcmRlciBpbiBpbnN0YW50aWF0ZSB0aGUgY29ycmVjdCB3b3JrZXIgbW9kdWxlIFxyXG4gICAgaWYoYXJnc1tcIm9wZXJhdGlvblwiXSA9PSBcImVuY3J5cHRcIil7XHJcbiAgICAgIGN1cnJlbnRXb3JrZXIgPSBuZXcgV29ya2VyKGdldFNjcmlwdHNEaXIoKSArICdFbmNyeXB0LmpzJywgZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3NbXCJvcGVyYXRpb25cIl0gPT0gXCJkZWNyeXB0XCIpIHtcclxuICAgICAgY3VycmVudFdvcmtlciA9IG5ldyBXb3JrZXIoZ2V0U2NyaXB0c0RpcigpICsgJ0RlY3J5cHQuanMnLCBkYXRhKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIExpc3RlbmVycyBmb3Igd29yayBwcm9ncmVzcyAvIGZpbmlzaCBvZiB0aGUgd29ya2VyIHRocmVhZCwgZWFjaCBsaXN0ZW5lciBpcyB0aWVkIHRvIHRoZSBjb3JyZXNwb25kaW5nIGNhbGxiYWNrIGRlZmluZWQgYWJvdmVcclxuICAgIGN1cnJlbnRXb3JrZXIub24oJ21lc3NhZ2UnICwgZGF0YSA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgXCJwcm9ncmVzc1wiOlxyXG4gICAgICAgICAgICBvblByb2dyZXNzKGRhdGEucHJvZ3Jlc3MpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJpbnZhbGlkLWhlbm9uXCI6XHJcbiAgICAgICAgICAgIGV2ZW50LnJlcGx5KCdpbnZhbGlkLWhlbm9uJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGN1cnJlbnRXb3JrZXIub24oJ2V4aXQnICwgY29kZSA9PntcclxuICAgICAgICBvbkZpbmlzaCgpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vIExpc3RlbmVyIGZvciB0aGUgY2FuY2VsaW5nIHRoZSBjdXJyZW50IG9wZXJhdGlvbiBcclxuaXBjTWFpbi5vbignY2FuY2VsJyAsIChldmVudCAsIGFyZ3MpID0+IHtcclxuICBcclxuICAgIC8vU2ltcGx5IHRlcm1pbmF0ZXMgdGhlIGN1cnJlbnQgd29ya2VyIHRocmVhZCBcclxuXHJcbiAgICBpZihjdXJyZW50V29ya2VyKXtcclxuICAgICAgY3VycmVudFdvcmtlci50ZXJtaW5hdGUoKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vIFJldHVybiBzY3JpcHRzIGRpcmVjdG9yeSBmb3IgZWFjaCB0YXJnZXQgcGxhdGZvcm1cclxuZnVuY3Rpb24gZ2V0U2NyaXB0c0Rpcigpe1xyXG5cclxuICBpZiggaXNEZXYgKSB7XHJcbiAgICByZXR1cm4gXCIuL2Rpc3QvXCI7XHJcbiAgfSBlbHNlIGlmKHByb2Nlc3MucGxhdGZvcm0gPT09IFwiZGFyd2luXCIpe1xyXG4gICAgcmV0dXJuIFwiLi9Db250ZW50cy9SZXNvdXJjZXMvXCI7XHJcbiAgfWVsc2V7XHJcbiAgICByZXR1cm4gXCIuL3Jlc291cmNlcy9cIjtcclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uLWlzLWRldlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndvcmtlcl90aHJlYWRzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=