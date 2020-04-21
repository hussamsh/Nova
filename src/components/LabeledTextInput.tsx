import * as React from 'react';
import styled from 'styled-components';
import Palette from '../palette';


const TextLabel = styled.p`
    background-color : ${Palette.gray};
    color : #959595;
    font-family: "Montserrat";
    display : flex;
    align-items: center;
    justify-content : center;
    font-weight : 800;
    font-size : 0.7em;
    padding-left : 10px;
    padding-right: 10px;
    white-space: nowrap;
    margin : 0px;
    border-top-left-radius : 8px;
    border-bottom-left-radius : 8px;
`

const Input = styled.input`
    background-color : transparent;
    padding : 10px;
    width : 100%;
    outline : none;
    color: white;
    font-size : 0.9em;
    font-weight: 500;
    border-radius : 10px;
    border : 0px; 
`
const Wrapper = styled.div`
    display : flex;
    border: 1.5px solid ${Palette.grayBorderColor};
    border-radius : 10px;

    transition : border-color .5s;
    
`

class LabeledTextInput extends React.Component<{ label : String , style ?: Object}, {}> {

    private wrapperRef = React.createRef<HTMLDivElement>();

    render() { 
        return ( 
            <Wrapper style={this.props.style} id="labeled-text-wrapper" ref={this.wrapperRef}>
                <TextLabel >{this.props.label}</TextLabel>
                <Input type="text" onBlur={() => {this.onBlurred()}} onFocus={() => {this.onFocused()}}/>
            </Wrapper>
         );
    }

    onFocused(){
        this.wrapperRef.current.style.borderColor = "white";
    }

    onBlurred(){
        this.wrapperRef.current.style.borderColor = Palette.grayBorderColor;
    }

}
 
export default LabeledTextInput;