import React from 'react';
import DropDown from './DropDown';
import styled from 'styled-components';
import ParametersInputSection from './ParametersInputSection';
import OutputPathSelectSection from './OutputPathSelectSection';
import { EncryptionAlgorithm } from '../interfaces/EncryptionAlgorithm';


const Container = styled.div`
    overflow-y: visible;
`

const EnceryptionLabel = styled.p`
    color : #9E9E9E;
    letter-spacing: .5px;
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
    margin-top: 10px;
    margin-bottom: 5px;
    padding-right: 5px;
`

const EquationWrapper = styled.div`
    margin-top: 30px;
    color : white;
    font-size: 0.9em;
    margin-bottom: 30px;
`

const Hr =  styled.hr`
    border-top : 2px solid #7a7e84;
`


 
class RightPanel extends React.Component<{availableAlgorithms : Array<EncryptionAlgorithm>} , {equation : String ,params : Array<{symbol : String , name: String}>}> {
    
    names = this.props.availableAlgorithms.map((element) => {
        return element.getName();
    });

    selectedAlgorithm = this.props.availableAlgorithms[0];

    parametersInputSectionRef = React.createRef<ParametersInputSection>();
    outputPathSelectRef = React.createRef<OutputPathSelectSection>();
    
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
                        {/* <ClickableLabel>Learn more</ClickableLabel> */}
                    </LabelWrapper>
                    
                    <DropDown items={this.names} onClick={this.onEncryptionTypeSelected.bind(this)}/>
                    
                    <EquationWrapper id="#equation-wrapper">
                        {equationMathJax}
                    </EquationWrapper>
                    
                    {/* <Hr></Hr> */}
                    
                    <ParametersInputSection  ref={this.parametersInputSectionRef} params={this.state.params}/>

                    <Hr></Hr>

                    <OutputPathSelectSection ref={this.outputPathSelectRef}/>

                    <Hr></Hr>
                  
                </div>      
            </Container>
        );
    }

    onEncryptionTypeSelected(index){
        if(this.selectedAlgorithm.getName() != this.props.availableAlgorithms[index].getName()){
            this.selectedAlgorithm = this.props.availableAlgorithms[index]
            this.setState({
                equation : this.selectedAlgorithm.getEquation(),
                params : this.selectedAlgorithm.getParameters()
            });       
        }
    }

    getInputData(){
        let inputParams = this.parametersInputSectionRef.current.getParamsInput();
        let outputPath = this.outputPathSelectRef.current.getPath();

        return {
            "selectedAlgorithm" : this.selectedAlgorithm.getName(),
            "inputParams" : inputParams,
            "outputPath" : outputPath
        }

    }

    onInputValidationFail(name : String , message : String){

        if(name == "outputPath"){
            this.outputPathSelectRef.current.onPathValidationFail(message)
        }else{
            this.parametersInputSectionRef.current.onInputParamsValidationFail(name , message);
        }
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
 

export default RightPanel;

