// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


import React from 'react'
import ReactDOM from 'react-dom'
import TopControlButtons from "./components/TopControlButtons";
import ControlsPanel from './components/ControlsPanel';
import Palette  from "./palette";




ReactDOM.render(
    <div className="container-fluid" style={{height:'inherit'}}>
        <div className="row" style={{height:'inherit'}}>
            
        <div className="col-9" style={{backgroundColor:Palette.mainPanel}}>

        </div>

        <div className="col-3" style={{backgroundColor:Palette.sidePanel, padding:"0px", margin:"0px"}}>
            <div className="top-bar">
                <TopControlButtons />
                {/* <div className="row align-items-center justify-content-center logo-container">
                        <img className="ui image logo" src="./assets/images/logo-name.png"/>
                </div>                 */}
            </div>
            
            <ControlsPanel>
                
            </ControlsPanel>



        </div>

        </div>
        
    </div>
    
    , document.getElementById('main'));