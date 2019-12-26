// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <div>
        <h1>Hello World, It Works !</h1>
        <p style={{fontSize:20}}>This project is setup with <span>Electron</span> , <span>Typescript</span> , <span>Webpack</span> and <span>React</span></p>
        <div style={{fontSize:12}}>
            <p>Dont forget to run 
            <span style={{marginLeft : 10, marginRight: 10}}>
                <code >
                    npm update
                </code>
            </span>
            to get the latest packages and 
            <span style={{marginLeft : 10, marginRight: 10}}>
                <code >
                    npm run watch
                </code>
            </span>
            to complie the files
            </p>
        </div>
    </div>
    
    , document.getElementById('main'));

console.log("Hello from renderer script");
