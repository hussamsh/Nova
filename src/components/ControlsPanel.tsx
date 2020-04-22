import React from 'react';
import DropDown from './DropDown';
import styled from 'styled-components';
import ParametersPanel from './ParametersPanel';
import Button from './Button';
import EncryptionTypes from '../nova/EncryptionTypes';
import PathLabeledInput from './PathLabeledInput';
import { EncryptionAlgorithm } from '../interfaces/EncryptionAlgorithm';


const Container = styled.div`
    padding : 15px;
    overflow-y: visible;
`

const EnceryptionLabel = styled.p`
    color : #7a7e84;
    font-size: 0.82em;
    font-weight: 800;
    margin-bottom: 0px;
`

const ClickableLabel = styled.a`
    color : #f2a365 !important;
    cursor: pointer;
    font-size: 0.8em;
    margin-bottom: 0px;
    margin-left: auto;
    font-weight: 300;

`
 
const LabelWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 5px;
    padding-right: 5px;
`

const EquationWrapper = styled.div`
    margin-top: 30px;
    color : white;
    /* font-size: 1em; */
    margin-bottom: 30px;
`

const Hr =  styled.hr`
    border-top : 2px solid #7a7e84;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction : column;
    margin-top : 20px;

`
 
class ControlsPanel extends React.Component<{availableAlgorithms : Array<EncryptionAlgorithm>, onEcnryptButtonClicked : Function , onDecryptButtonClicked : Function} , {equation : String ,params : Array<{symbol : String , name: String}>}> {
    
    names = this.props.availableAlgorithms.map((element) => {
        return element.getName();
    });

    selectedAlgorithm = this.props.availableAlgorithms[0];

    parametersPanelRef = React.createRef<ParametersPanel>();
    outputPathInput = React.createRef<PathLabeledInput>();
    
    constructor(props){
        super(props);
        this.state = {
            equation : this.selectedAlgorithm.getEquation(),
            params : this.selectedAlgorithm.getParameters(),
        }
    }

    render() {
        let equationMathJax = "$$ " + this.state.equation + " $$" 
        return (  
            <Container>
                <div className="encryption-panel">
                    
                    <LabelWrapper>
                        <EnceryptionLabel>ENCRYPTION TYPE</EnceryptionLabel>
                        <ClickableLabel>Learn more</ClickableLabel>
                    </LabelWrapper>
                    
                    <DropDown items={this.names} onClick={this.onEncryptionTypeSelected.bind(this)}/>
                    
                    <EquationWrapper id="#equation-wrapper">
                        {equationMathJax}
                    </EquationWrapper>
                    
                    <Hr></Hr>
                    
                    <ParametersPanel  ref={this.parametersPanelRef} params={this.state.params}/>

                    <Hr></Hr>

                    <PathLabeledInput ref={this.outputPathInput}/>

                    <Hr></Hr>


                    <ButtonWrapper>
                        <Button onClick={() => this.props.onEcnryptButtonClicked()}> <i className="fas fa-fingerprint"></i> Encrypt</Button>
                        <Button onClick={() => this.props.onDecryptButtonClicked()} style={{marginTop: "10px"}}> <i className="far fa-image"></i> Decrypt</Button>
                    </ButtonWrapper>
                  
                </div>      
            </Container>
        );
    }

    onEncryptionTypeSelected(index){
        this.selectedAlgorithm = this.props.availableAlgorithms[index]
        this.setState({
            equation : this.selectedAlgorithm.getEquation(),
            params : this.selectedAlgorithm.getParameters()
        });        
    }

    getInputData(){
        let inputParams = this.parametersPanelRef.current.getParamsInput();
        let outputPath = this.outputPathInput.current.getPath();

        return {
            "selectedAlgorithm" : this.selectedAlgorithm.getName(),
            "inputParams" : inputParams,
            "outputParams" : outputPath
        }

    }

    showMissingValueMessage(name : String){
        this.parametersPanelRef.current.showMissingValueMessage(name);
    }

    componentDidUpdate(prevProps , prevState) {
        this.updateMath();
    }

    updateMath(){
        let scriptTag = document.getElementById("mathjax-update-script")
        if(scriptTag){
            document.body.removeChild(scriptTag);
        }
  
        let script = document.createElement('script');
        script.id = "mathjax-update-script";
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = "MathJax.typeset();";
        document.body.appendChild(script);
    }

}
 

export default ControlsPanel;

