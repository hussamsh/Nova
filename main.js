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

/***/ "./src/helpers/Enums.ts":
/*!******************************!*\
  !*** ./src/helpers/Enums.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Events;
(function (Events) {
    Events["INITIALIZATING"] = "initializing";
    Events["READ_IMAGE"] = "read_image";
    Events["RESIZING_IMAGE"] = "resize_image";
    Events["PROGRESS"] = "progress";
    Events["FAILED"] = "failed";
    Events["FINISHED"] = "finished";
    Events["CANCELED"] = "canceled";
})(Events = exports.Events || (exports.Events = {}));


/***/ }),

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
const Enums_1 = __webpack_require__(/*! ./helpers/Enums */ "./src/helpers/Enums.ts");
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
    //Parameters that is unique to the current c`ryptographic algorithm
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
    electron_1.ipcMain.on(Enums_1.Events.PROGRESS, (subEvent, message) => {
        event.reply(Enums_1.Events.PROGRESS, message);
    });
    electron_1.ipcMain.on(Enums_1.Events.FINISHED, () => {
        threadWindow.destroy();
    });
    electron_1.ipcMain.on(Enums_1.Events.FAILED, () => {
        threadWindow.destroy();
        event.reply(Enums_1.Events.FAILED);
    });
    threadWindow.webContents.once('did-finish-load', () => {
        threadWindow.webContents.send('crypto', data);
    });
    threadWindow.on('closed', () => {
        event.reply(Enums_1.Events.FINISHED);
        electron_1.ipcMain.removeAllListeners(Enums_1.Events.FAILED);
        electron_1.ipcMain.removeAllListeners(Enums_1.Events.FINISHED);
        electron_1.ipcMain.removeAllListeners(Enums_1.Events.PROGRESS);
        threadWindow = null;
    });
});
// Listener for the canceling the current operation 
electron_1.ipcMain.on(Enums_1.Events.CANCELED, (event, args) => {
    //Simply terminates the current worker thread 
    if (threadWindow) {
        threadWindow.destroy();
    }
});


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvRW51bXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBLElBQVksTUFRWDtBQVJELFdBQVksTUFBTTtJQUNkLHlDQUErQjtJQUMvQixtQ0FBeUI7SUFDekIseUNBQStCO0lBQy9CLCtCQUFxQjtJQUNyQiwyQkFBaUI7SUFDakIsK0JBQXFCO0lBQ3JCLCtCQUFxQjtBQUN6QixDQUFDLEVBUlcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBUWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FD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R0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQztBQUdILG9EQUFvRDtBQUNwRCxrQkFBTyxDQUFDLEVBQUUsQ0FBQyxjQUFNLENBQUMsUUFBUSxFQUFHLENBQUMsS0FBSyxFQUFHLElBQUksRUFBRSxFQUFFO0lBRTVDLDhDQUE4QztJQUM5QyxJQUFHLFlBQVksRUFBQztRQUNkLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN4QjtBQUVILENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNqTEgscUM7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCJcclxuXHJcbmV4cG9ydCBlbnVtIEV2ZW50cyB7XHJcbiAgICBJTklUSUFMSVpBVElORyA9IFwiaW5pdGlhbGl6aW5nXCIsXHJcbiAgICBSRUFEX0lNQUdFID0gXCJyZWFkX2ltYWdlXCIsXHJcbiAgICBSRVNJWklOR19JTUFHRSA9IFwicmVzaXplX2ltYWdlXCIsXHJcbiAgICBQUk9HUkVTUyA9IFwicHJvZ3Jlc3NcIixcclxuICAgIEZBSUxFRCA9IFwiZmFpbGVkXCIsXHJcbiAgICBGSU5JU0hFRCA9IFwiZmluaXNoZWRcIixcclxuICAgIENBTkNFTEVEID0gXCJjYW5jZWxlZFwiLCAgIFxyXG59XHJcbiIsImltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdyAsIGdsb2JhbFNob3J0Y3V0LCBkaWFsb2csIGlwY01haW4gfSBmcm9tIFwiZWxlY3Ryb25cIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBFdmVudHMgfSBmcm9tIFwiLi9oZWxwZXJzL0VudW1zXCI7XHJcblxyXG5sZXQgbWFpbldpbmRvdzogRWxlY3Ryb24uQnJvd3NlcldpbmRvdztcclxubGV0IHRocmVhZFdpbmRvdyA6IEVsZWN0cm9uLkJyb3dzZXJXaW5kb3c7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVXaW5kb3coKSB7XHJcbiAgLy8gQ3JlYXRlIHRoZSBicm93c2VyIHdpbmRvdy5cclxuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe1xyXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcclxuICAgICAgcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuL2Rpc3QvcHJlbG9hZC5qc1wiKSxcclxuICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxyXG4gICAgICBub2RlSW50ZWdyYXRpb25JbldvcmtlcjogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHdpZHRoOiAxMjAwLFxyXG4gICAgaGVpZ2h0OiA3MDAsXHJcbiAgICBtaW5XaWR0aCA6IDEyMDAsXHJcbiAgICBtaW5IZWlnaHQgOiA3MDAsXHJcbiAgICBmcmFtZSA6IGZhbHNlLFxyXG4gIH0pO1xyXG5cclxuICAvLyBhbmQgbG9hZCB0aGUgaW5kZXguaHRtbCBvZiB0aGUgYXBwLlxyXG4gIG1haW5XaW5kb3cubG9hZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuL2FwcC9pbmRleC5odG1sXCIpKTtcclxuXHJcbiAgLy8gT3BlbiB0aGUgRGV2VG9vbHMuXHJcbiAgLy8gbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcclxuXHJcbiAgXHJcbiAgbWFpbldpbmRvdy5vbignY2xvc2UnICwgKCkgPT57XHJcbiAgICBcclxuICAgIGlmKHRocmVhZFdpbmRvdyl7XHJcbiAgICAgIGlwY01haW4ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbiAgICAgIHRocmVhZFdpbmRvdy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgICAgdGhyZWFkV2luZG93LmRlc3Ryb3koKTtcclxuICAgICAgdGhyZWFkV2luZG93ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgfSlcclxuICAvLyBFbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyBjbG9zZWQuXHJcbiAgbWFpbldpbmRvdy5vbihcImNsb3NlZFwiLCAoKSA9PiB7XHJcbiAgICAvLyBEZXJlZmVyZW5jZSB0aGUgd2luZG93IG9iamVjdCwgdXN1YWxseSB5b3Ugd291bGQgc3RvcmUgd2luZG93c1xyXG4gICAgLy8gaW4gYW4gYXJyYXkgaWYgeW91ciBhcHAgc3VwcG9ydHMgbXVsdGkgd2luZG93cywgdGhpcyBpcyB0aGUgdGltZVxyXG4gICAgLy8gd2hlbiB5b3Ugc2hvdWxkIGRlbGV0ZSB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50LlxyXG4gICAgXHJcbiAgICBtYWluV2luZG93ID0gbnVsbDtcclxuICB9KTtcclxuXHJcbiAgZ2xvYmFsU2hvcnRjdXQucmVnaXN0ZXIoJ0NvbW1hbmRPckNvbnRyb2wrUicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bWFpbldpbmRvdy5yZWxvYWQoKVxyXG4gIH0pXHJcbiAgXHJcbiAgZ2xvYmFsU2hvcnRjdXQucmVnaXN0ZXIoJ0NvbW1hbmRPckNvbnRyb2wrVycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0bWFpbldpbmRvdy5jbG9zZSgpXHJcbiAgfSlcclxuICBcclxuICBnbG9iYWxTaG9ydGN1dC5yZWdpc3RlcignQ29tbWFuZE9yQ29udHJvbCtTaGlmdCtJJywgZnVuY3Rpb24oKSB7XHJcblx0XHRtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xyXG4gIH0pXHJcbn1cclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIHdoZW4gRWxlY3Ryb24gaGFzIGZpbmlzaGVkXHJcbi8vIGluaXRpYWxpemF0aW9uIGFuZCBpcyByZWFkeSB0byBjcmVhdGUgYnJvd3NlciB3aW5kb3dzLlxyXG4vLyBTb21lIEFQSXMgY2FuIG9ubHkgYmUgdXNlZCBhZnRlciB0aGlzIGV2ZW50IG9jY3Vycy5cclxuYXBwLm9uKFwicmVhZHlcIiwgY3JlYXRlV2luZG93KTtcclxuXHJcbi8vIFF1aXQgd2hlbiBhbGwgd2luZG93cyBhcmUgY2xvc2VkLlxyXG5hcHAub24oXCJ3aW5kb3ctYWxsLWNsb3NlZFwiLCAoKSA9PiB7XHJcbiAgLy8gT24gT1MgWCBpdCBpcyBjb21tb24gZm9yIGFwcGxpY2F0aW9ucyBhbmQgdGhlaXIgbWVudSBiYXJcclxuICAvLyB0byBzdGF5IGFjdGl2ZSB1bnRpbCB0aGUgdXNlciBxdWl0cyBleHBsaWNpdGx5IHdpdGggQ21kICsgUVxyXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSBcImRhcndpblwiKSB7XHJcbiAgICBhcHAucXVpdCgpO1xyXG4gIH1cclxufSk7XHJcblxyXG5hcHAub24oXCJhY3RpdmF0ZVwiLCAoKSA9PiB7XHJcbiAgLy8gT24gT1MgWCBpdFwicyBjb21tb24gdG8gcmUtY3JlYXRlIGEgd2luZG93IGluIHRoZSBhcHAgd2hlbiB0aGVcclxuICAvLyBkb2NrIGljb24gaXMgY2xpY2tlZCBhbmQgdGhlcmUgYXJlIG5vIG90aGVyIHdpbmRvd3Mgb3Blbi5cclxuICBpZiAobWFpbldpbmRvdyA9PT0gbnVsbCkge1xyXG4gICAgY3JlYXRlV2luZG93KCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIEluIHRoaXMgZmlsZSB5b3UgY2FuIGluY2x1ZGUgdGhlIHJlc3Qgb2YgeW91ciBhcHBcInMgc3BlY2lmaWMgbWFpbiBwcm9jZXNzXHJcbi8vIGNvZGUuIFlvdSBjYW4gYWxzbyBwdXQgdGhlbSBpbiBzZXBhcmF0ZSBmaWxlcyBhbmQgcmVxdWlyZSB0aGVtIGhlcmUuXHJcblxyXG5cclxuLypcclxuICBMaXN0ZW5lciBmb3Igb3BlbmluZyBhIGRpcmVjdG9yeSBzZWxlY3Rpb24gdG8gc2F2ZSB0aGUgb3V0cHV0IGZpbGUgaW5cclxuKi9cclxuaXBjTWFpbi5vbignc2VsZWN0LWRpcnMnLCBhc3luYyAoZXZlbnQsIGFyZykgPT4ge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRpYWxvZy5zaG93T3BlbkRpYWxvZyhtYWluV2luZG93LCB7XHJcbiAgICBwcm9wZXJ0aWVzOiBbJ29wZW5EaXJlY3RvcnknXVxyXG4gIH0pXHJcblxyXG4gIGlmKHJlc3VsdC5maWxlUGF0aHMubGVuZ3RoICE9IDApe1xyXG4gICAgZXZlbnQucmVwbHkoJ2ZvbGRlci1zZWxlY3RlZCcgLCByZXN1bHQuZmlsZVBhdGhzWzBdKTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gIExpc3RlbmVyIGZvciBjcnlwdG9ncmFwaGljIG9wZXJhdGlvbnMgLSBlbmNyeXB0IC8gZGVjcnlwdCAuXHJcbiovXHJcbmlwY01haW4ub24oJ2NyeXB0bycgLCAoZXZlbnQgLCBhcmdzKSA9PiB7XHJcblxyXG4gICAgLy9QYXJhbWV0ZXJzIHRoYXQgaXMgdW5pcXVlIHRvIHRoZSBjdXJyZW50IGNgcnlwdG9ncmFwaGljIGFsZ29yaXRobVxyXG4gICAgLy9SZXN0cnVjdHVyZSB0aGUgaW5wdXQgXHJcbiAgIGxldCBwYXJhbWV0ZXJzID0gbmV3IE9iamVjdCgpO1xyXG4gICBhcmdzW1wiaW5wdXRQYXJhbXNcIl0uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBwYXJhbWV0ZXJzW2VsZW1lbnQubmFtZV0gPSBlbGVtZW50LnZhbHVlO1xyXG4gICB9KTtcclxuXHJcbiAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIG9wZXJhdGlvbiA6IGFyZ3NbXCJvcGVyYXRpb25cIl0sXHJcbiAgICAgIGFsZ29yaXRobSA6IGFyZ3NbXCJzZWxlY3RlZEFsZ29yaXRobVwiXSxcclxuICAgICAgcGFyYW1ldGVycyA6IHBhcmFtZXRlcnMsXHJcbiAgICAgIGltYWdlUGF0aCA6IGFyZ3NbXCJpbnB1dFBhdGhcIl0sXHJcbiAgICAgIG91dHB1dEZvbGRlciA6IGFyZ3NbXCJvdXRwdXRQYXRoXCJdLFxyXG4gICAgICBvcHRpbWl6ZSA6IGFyZ3NbXCJvcHRpbWl6ZUltYWdlXCJdXHJcbiAgfTtcclxuICBcclxuICB0aHJlYWRXaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XHJcbiAgICBzaG93OiBmYWxzZSxcclxuICAgIHBhcmVudDogbWFpbldpbmRvdyxcclxuICAgIHdlYlByZWZlcmVuY2VzOiB7XHJcbiAgICAgICAgcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuL2Rpc3QvcHJlbG9hZC5qc1wiKSxcclxuICAgICAgICBub2RlSW50ZWdyYXRpb246IHRydWUsXHJcbiAgICAgICAgbm9kZUludGVncmF0aW9uSW5Xb3JrZXI6IHRydWUsXHJcbiAgICAgICAgbm9kZUludGVncmF0aW9uSW5TdWJGcmFtZXM6IHRydWUsXHJcbiAgICAgICAgZGV2VG9vbHM6IHRydWUsXHJcbiAgICAgICAgYmFja2dyb3VuZFRocm90dGxpbmc6IGZhbHNlXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHRocmVhZFdpbmRvdy5sb2FkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4vYXBwL2VtcHR5Lmh0bWxcIikpO1xyXG5cclxuICBpcGNNYWluLm9uKEV2ZW50cy5QUk9HUkVTUyAsIChzdWJFdmVudCAsIG1lc3NhZ2UpID0+IHtcclxuICAgIGV2ZW50LnJlcGx5KEV2ZW50cy5QUk9HUkVTUyAsIG1lc3NhZ2UpO1xyXG4gIH0pO1xyXG5cclxuICBpcGNNYWluLm9uKEV2ZW50cy5GSU5JU0hFRCwgKCkgPT57XHJcbiAgICB0aHJlYWRXaW5kb3cuZGVzdHJveSgpO1xyXG4gIH0pO1xyXG5cclxuICBpcGNNYWluLm9uKEV2ZW50cy5GQUlMRUQgLCAoKSA9PiB7XHJcbiAgICB0aHJlYWRXaW5kb3cuZGVzdHJveSgpO1xyXG4gICAgZXZlbnQucmVwbHkoRXZlbnRzLkZBSUxFRCk7XHJcbiAgfSk7XHJcblxyXG4gIHRocmVhZFdpbmRvdy53ZWJDb250ZW50cy5vbmNlKCdkaWQtZmluaXNoLWxvYWQnICwgKCkgPT4ge1xyXG5cclxuICAgIHRocmVhZFdpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdjcnlwdG8nICwgZGF0YSk7XHJcblxyXG4gIH0pO1xyXG5cclxuICB0aHJlYWRXaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcclxuICAgIGV2ZW50LnJlcGx5KEV2ZW50cy5GSU5JU0hFRCk7XHJcblxyXG4gICAgaXBjTWFpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoRXZlbnRzLkZBSUxFRCk7XHJcbiAgICBpcGNNYWluLnJlbW92ZUFsbExpc3RlbmVycyhFdmVudHMuRklOSVNIRUQpO1xyXG4gICAgaXBjTWFpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoRXZlbnRzLlBST0dSRVNTKTtcclxuICAgIHRocmVhZFdpbmRvdyA9IG51bGw7XHJcbiAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG4vLyBMaXN0ZW5lciBmb3IgdGhlIGNhbmNlbGluZyB0aGUgY3VycmVudCBvcGVyYXRpb24gXHJcbmlwY01haW4ub24oRXZlbnRzLkNBTkNFTEVEICwgKGV2ZW50ICwgYXJncykgPT4ge1xyXG4gIFxyXG4gIC8vU2ltcGx5IHRlcm1pbmF0ZXMgdGhlIGN1cnJlbnQgd29ya2VyIHRocmVhZCBcclxuICBpZih0aHJlYWRXaW5kb3cpe1xyXG4gICAgdGhyZWFkV2luZG93LmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9