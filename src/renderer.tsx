// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react'
import ReactDOM from 'react-dom'
import TopControlButtons from "./components/TopControlButtons";
import ControlsPanel from './components/ControlsPanel';
import ImageInput from "./components/ImageInput";
import Palette  from "./palette";
import EncryptionTypes from './nova/EncryptionTypes';

let controlPanelRef = React.createRef<ControlsPanel>();
let imageInputRef = React.createRef<ImageInput>();
let algorithms = EncryptionTypes.algorithms;

ReactDOM.render(
    <div className="container-fluid" style={{height:'inherit'}}>
        <div className="row" style={{height:'inherit'}}>
            
            <div className="col-9" style={{backgroundColor:Palette.mainPanel, height:"inherit"}}>
                <ImageInput ref={imageInputRef}/>
            </div>

            <div className="col-3" style={{backgroundColor:Palette.sidePanel, padding:"0px", margin:"0px"}}>
                <div className="top-bar">
                    <TopControlButtons />
                    {/* <div className="row align-items-center justify-content-center logo-container">
                            <img className="ui image logo" src="./assets/images/logo-name.png"/>
                    </div>                 */}
                </div>
                
                <ControlsPanel availableAlgorithms={algorithms} ref={controlPanelRef} onEcnryptButtonClicked={onEcnryptButtonClicked} onDecryptButtonClicked={onDecryptButtonClicked}/>

            </div>

        </div>
        
    </div>
    
    , document.getElementById('main'));


    function onEcnryptButtonClicked() {

        //Get input that was returned from parameter panel
        let input = controlPanelRef.current.getInputData();

        //Find which encryption algorithm is being used
        let selectedAlgo = algorithms.find( e => {
            return e.getName() == input.selectedAlgorithm;
        });

        /*
            Compare the selected encryption algorithm's parameters with the returned parameter 
            if there is any mismatch or a parameter missing between what returned and the algorithms parameters 
            propagate that an error tooltip must be shown for the missing parameter
        */
        for (let i = 0; i < selectedAlgo.getParameters().length; i++) {
            let paramName = selectedAlgo.getParameters()[i].name;
            if(input.inputParams[paramName.toString()] == undefined || input.inputParams[paramName.toString()].length == 0){
                controlPanelRef.current.showMissingValueMessage(paramName);
            }
            
        }

        // console.log()
        console.log(imageInputRef.current.getImagePath())
    }

    function onDecryptButtonClicked(){

    }