import React from 'react';
import DropDown from './DropDown';
import styled from 'styled-components';
import ParametersPanel from './ParametersPanel';
import Button from './Button';
import EncryptionTypes from '../nova/EncryptionTypes';

const Container = styled.div`
    padding : 15px;
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
 
class ControlsPanel extends React.Component<{} , {equation : String ,params : Array<{symbol : String , name: String}>}> {

    alogrithms = EncryptionTypes.algorithms;
    
    names = this.alogrithms.map((element) => {
        return element.getName();
    });

    selectedAlgorithm = this.alogrithms[0];
    
    constructor(props){
        super(props);
        this.state = {
            equation : this.selectedAlgorithm.getEquation(),
            params : this.selectedAlgorithm.getParameters()
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
                    
                    <ParametersPanel  params={this.state.params}/>

                    <ButtonWrapper>
                        <Button onClick={() => console.log("Encrypt clicked")}> <i className="fas fa-fingerprint"></i> Encrypt</Button>
                        <Button onClick={() => console.log("Decrypt clicked")} style={{marginTop: "10px"}}> <i className="far fa-image"></i> Decrypt</Button>
                    </ButtonWrapper>
                  
                </div>      
            </Container>
        );
    }

    onEncryptionTypeSelected(index){
        this.selectedAlgorithm = this.alogrithms[index]
        this.setState({
            equation : this.selectedAlgorithm.getEquation(),
            params : this.selectedAlgorithm.getParameters()
        });        
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

