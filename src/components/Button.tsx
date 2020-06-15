import * as React from 'react';
import styled from 'styled-components';
import Palette from '../palette';

 
const StyledButton = styled.button`
    border : 0px;
    border-radius: 4px;
    padding-top : 5px;
    padding-bottom : 5px;
    padding-left : 10px;
    padding-right : 10px;
    /* font-family : "Montserrat"; */
    font-weight : 900;
    font-size: 0.95em;
    /* color : ${Palette.materialBlack}; */
    background-color : ${Palette.accentColor};
    &:focus{
        outline : none;
    }
`


class Button extends React.Component<{style ?: Object, onClick ?: Function}, {}> {


    buttonRef = React.createRef<HTMLButtonElement>();
    enabled : boolean = true;

    render() { 
        return ( 
            <StyledButton ref={this.buttonRef} style={this.props.style} onClick={() => this.onClick()}>
                {this.props.children}
            </StyledButton>
         );
    }

    onClick(){

        if(this.enabled){
            this.props.onClick();
        }
        
    }

    disable(){
        this.enabled = false;
        this.buttonRef.current.style.backgroundColor = Palette.disabledColor;
    }

    enable(){
        this.enabled = true;
        this.buttonRef.current.style.backgroundColor = Palette.accentColor;
    }
}


 
export default Button;