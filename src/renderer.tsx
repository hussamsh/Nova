// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react'
import ReactDOM from 'react-dom'
import TopControlButtons from "./components/TopControlButtons";
import RightPanel from './components/RightPanel';
import ImageInput from "./components/ImageInput";
import Palette  from "./palette";
import EncryptionTypes from './nova/EncryptionTypes';
import Button from './components/Button';
import styled from 'styled-components';
import fs from 'fs';

let controlPanelRef = React.createRef<RightPanel>();
let imageInputRef = React.createRef<ImageInput>();
let algorithms = EncryptionTypes.algorithms;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction : column;
`

const TopBar = styled.div`
    -webkit-user-select: none;
    -webkit-app-region: drag;
    background-color:#1d2229;
    width:auto;
    /* padding: 10px; */
`

ReactDOM.render(
    <div className="container-fluid" style={{height:'inherit'}}>
        <div className="row" style={{height:'inherit'}}>
            
            <div className="col-9" style={{backgroundColor:Palette.mainPanel, height:"inherit"}}>
                <ImageInput ref={imageInputRef}/>
            </div>

            <div className="col-3" style={{backgroundColor:Palette.sidePanel, padding:"0px", margin:"0px"}}>
                <TopBar>
                    <TopControlButtons />
                    {/* <div className="row align-items-center justify-content-center logo-container">
                            <img className="ui image logo" src="./assets/images/logo-name.png"/>
                    </div>                 */}
                </TopBar>
                
                <div className="right-wrapper" style={{padding:"15px"}}>
                    <RightPanel availableAlgorithms={algorithms} ref={controlPanelRef} />

                    <ButtonWrapper>
                        <Button onClick={() => onEcnryptButtonClicked()}> <i className="fas fa-fingerprint"></i> Encrypt</Button>
                        <Button onClick={() => onDecryptButtonClicked()} style={{marginTop: "10px"}}> <i className="far fa-image"></i> Decrypt</Button>
                    </ButtonWrapper>
                </div>
                

            </div>

        </div>
        
    </div>
    
    , document.getElementById('main'));


    function onEcnryptButtonClicked() {

        if(validateInput()){
            console.log("Encrypt the image");
        }else{
            console.log("Input invalid");
        }

        


    }

    function onDecryptButtonClicked(){
        
        if(validateInput()){
            console.log("Decrypt the image");
        }else{
            console.log("Input invalid");
        }

    }


    function validateInput() : boolean {
        //Get input that was returned from parameters panel
        let currentState = controlPanelRef.current.getInputData();
        let inputValid = true;

        //Validate that no parameter is having empty values
        currentState.inputParams.forEach( e  => {
            if (e.value.length == 0){
                controlPanelRef.current.onInputValidationFail(e.name , "Missing Value");
                inputValid = false;
            }
        });


        //Validate if the output path is exists or not
        if (currentState.outputPath.length == 0){
            controlPanelRef.current.onInputValidationFail("outputPath", "Missing Value")
            inputValid = false;
        }else if(!fs.existsSync(currentState.outputPath.toString())){
            controlPanelRef.current.onInputValidationFail("outputPath" , "Folder doesn't exist")
            inputValid = false;
        }   


        let imageInputPath = imageInputRef.current.getImagePath()

        if(imageInputPath.length == 0){
            imageInputRef.current.triggerErrorTooltip("No image selected")
            inputValid = false;
        }

        return inputValid;
    }