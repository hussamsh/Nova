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
    color : ${Palette.materialBlack};
    background-color : ${Palette.accentColor};

    &:focus{
        outline : none;
    }
`


class Button extends React.Component<{style ?: Object, onClick ?: Function}, {}> {
    render() { 
        return ( 
            <StyledButton style={this.props.style} onClick={() => this.props.onClick()}>
                {this.props.children}
            </StyledButton>
         );
    }
}
 
export default Button;