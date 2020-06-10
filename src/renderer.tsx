// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react';
import ReactDOM from 'react-dom';
import TopControlButtons from "./components/TopControlButtons";
import RightPanel from './components/RightPanel';
import ImageInput from "./components/ImageInput";
import Palette  from "./palette";
import EncryptionTypes from './nova/EncryptionTypes';
import Button from './components/Button';
import styled from 'styled-components';
import fs from 'fs';
import { ipcRenderer } from "electron";
import { Spinner } from "./components/Spinner";

//References to all react components in view
let controlPanelRef = React.createRef<RightPanel>();
let imageInputRef = React.createRef<ImageInput>();
let spinnerRef = React.createRef<Spinner>();
let encryptButtonRef = React.createRef<Button>();
let decryptButtonRef = React.createRef<Button>();

let busy = false;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction : column;
`

const TopBar = styled.div`
    -webkit-user-select: none;
    -webkit-app-region: drag;
    background-color:${Palette.sidePanel};
    width:100%;
    padding: 5px;
    padding-left: 20px;

`

const ImageAreaWrapper = styled.div`
    background: rgb(25,46,69);
    background: radial-gradient(circle, rgba(25,46,69,1) 0%, rgba(20,30,48,1) 100%);
    /* background-color : ${Palette.mainPanel}; */
    border-top-right-radius : 20px;
    height: inherit;
    margin: 0px;
    padding: 0px;
`

const RightPanelWrapper = styled.div`
    margin: 0px;
    padding-left : 10px;
    padding-right: 10px;
    background-color: ${Palette.sidePanel};
`

const Wrapper = styled.div`
    height:inherit;
    background-color : ${Palette.sidePanel};
`;

const Logo = styled.img`
    height : 25px;
    width : 40px;
`

ReactDOM.render(

    <Wrapper className="container-fluid">

        <div className="row">
            <TopBar className="d-flex align-items-center">
                <Logo src="./assets/images/nova.png" />
                <TopControlButtons />
            </TopBar>
        </div>
        
        <div className="row" style={{height:'98%'}}>

            <ImageAreaWrapper className="col-9">
                <Spinner ref={spinnerRef}  onCancelClicked={ () => onCancelOperation() }/>
                <ImageInput ref={imageInputRef}/>
            </ImageAreaWrapper>

            <RightPanelWrapper className="col-3">

                <div className="right-wrapper" style={{padding:"15px"}}>
                    <RightPanel availableAlgorithms={EncryptionTypes.algorithms} ref={controlPanelRef} />

                    <ButtonWrapper>
                        <Button ref={encryptButtonRef} onClick={() => onEcnryptButtonClicked()}> <i className="fas fa-fingerprint"></i> Encrypt</Button>    
                        <Button ref={decryptButtonRef} onClick={() => onDecryptButtonClicked()} style={{marginTop: "10px"}}> <i className="far fa-image"></i> Decrypt</Button>
                    </ButtonWrapper>

                </div>
                
            </RightPanelWrapper>

        </div>
        
    </Wrapper>
    
    , document.getElementById('main'));

    function onCryptoOperationStarted() {
        busy = true;
        spinnerRef.current.show();
        encryptButtonRef.current.disable();
        decryptButtonRef.current.disable();
    }

    function onCryptoOperationEnded(){
        busy = false;
        spinnerRef.current.setText("");
        spinnerRef.current.hide();
        encryptButtonRef.current.enable();
        decryptButtonRef.current.enable();
    }

    function onEcnryptButtonClicked() {

        if(validateInput()){
            let inputData = controlPanelRef.current.getInputData();
            inputData["inputPath"] = imageInputRef.current.getImagePath();
            inputData["operation"] = "encrypt";
            
            ipcRenderer.send('crypto', inputData);
            onCryptoOperationStarted();

        }else{
            console.log("Input invalid");
        }
    }

    function onDecryptButtonClicked(){
        
        if(validateInput()){
            let inputData = controlPanelRef.current.getInputData();
            inputData["inputPath"] = imageInputRef.current.getImagePath();
            inputData["operation"] = "decrypt";

            ipcRenderer.send('crypto', inputData);
            onCryptoOperationStarted();

        } else{
            console.log("Input invalid");
        }

    }

    function onCancelOperation(){
        ipcRenderer.send('cancel');
    }

    function validateInput() : boolean {
        //Get input that was returned from parameters panel
        let currentState = controlPanelRef.current.getInputData();
        let parameters = currentState["inputParams"];
        let inputValid = true;

        //Validate that no parameter is having empty values
        currentState.inputParams.forEach( e  => {
            if (e.value.length == 0){
                controlPanelRef.current.onInputValidationFail(e.name , "Missing Value");
                inputValid = false;
            }
        });

        if (inputValid){
            switch(currentState["selectedAlgorithm"]){
                case EncryptionTypes.DH.getName(): 
                {
                    let r = +(parameters[0].value);
                    let x = +(parameters[1].value);
                    let c = +(parameters[2].value);

                    if( x > 2 * c ){
                        controlPanelRef.current.onInputValidationFail(parameters[1].name , "x must be <= (2c)");
                        inputValid = false;
                    }
            
                    let cubed  = Math.pow(c , 3);
                    
                    if(r > 8 / cubed){
                        controlPanelRef.current.onInputValidationFail(parameters[0].name , "λ must be <= (8/c^3)");
                        inputValid = false;
                    }
                }
                
                break;
                case EncryptionTypes.Logistic.getName():
                {
                    let x = +(parameters[0].value);
                    let r = +(parameters[1].value);

                    if(x > 1){
                        controlPanelRef.current.onInputValidationFail(parameters[0].name , "x must be <= 1");
                        inputValid = false;
                    }

                    if(r > 4){
                        controlPanelRef.current.onInputValidationFail(parameters[1].name , "x must be <= 4");
                        inputValid = false;
                    }
                    
                }

                break;
            }
        }
        

        //Validate if the output path exists or not
        if (currentState.outputPath.length == 0){
            controlPanelRef.current.onInputValidationFail("outputPath", "Missing Value")
            inputValid = false;
        }else if(!fs.existsSync(currentState.outputPath.toString())){
            controlPanelRef.current.onInputValidationFail("outputPath" , "Folder doesn't exist")
            inputValid = false;
        }   


        let imageInputPath = imageInputRef.current.getImagePath()

        //Check if an image is selected
        if(imageInputPath.length == 0){
            imageInputRef.current.triggerErrorTooltip("No image selected")
            inputValid = false;
        }

        return inputValid;
    }

    ipcRenderer.on('finished' , (event , args) => {
        console.log("Finished");
        onCryptoOperationEnded();
    });

    ipcRenderer.on('progress' , (event , progress) => {
        spinnerRef.current.setText("PROGRESS " + Math.floor(progress) + " %")
    });