import * as React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import Input from "./Input";
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/animations/shift-away.css'

const TextLabel = styled.p`
    color : white;
    width : 30px;
    text-align: center;
    font-weight : 800;
    margin : 0px;
    padding:0px;
`

const TextWrapper = styled.div`
    padding: 10px;
    width: fit-content;
    border-radius : 10px;
    background-color : #1972FE;
`

// const Input = styled.input`
//     transition : border-color .5s;
//     margin: 0px;
//     background-color : rgba(240, 240, 240, 0.2);
//     padding : 10px;
//     width : 100%;
//     outline : none;
//     border-radius: 10px;
//     margin-left: 10px;
//     color: black;
//     font-size : 0.9em;
//     font-weight: 600;
//     border: 3px solid transparent;
// `
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    
`

class TopLabledTextInput extends React.Component<{name : String, label : String ,type : string , style ?: Object  , value ?: string }> {

    private tippyElement;
    private inputElementRef = React.createRef<Input>();

    render() { 
        return ( 
             <Wrapper style={this.props.style} id="labeled-text-wrapper" className="shadow" >
                 <TextWrapper className="shadow-sm">
                    <Tippy 
                            onCreate={ tip => {this.tippyElement = tip}}
                            theme="warning"
                            placement="left"
                            animation="shift-away"
                            trigger="manual"
                        >
                        <TextLabel >{this.props.label}</TextLabel>
                    </Tippy>

                 </TextWrapper>
                                        
                <Input ref={this.inputElementRef} value={this.props.value} type={this.props.type} marginLeft="10px" />
            </Wrapper>
           
         );
    }

    triggerErrorTooltip(message : String){
        this.tippyElement.setContent(message);
        this.tippyElement.show();
    }

    getValue() : String {
        return this.inputElementRef.current.getValue()
    }
}
 
export default TopLabledTextInput;