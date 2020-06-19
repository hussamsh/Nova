import * as React from 'react';
import styled from 'styled-components';
import Palette from '../helpers/palette';


const Input = styled.input`
    background-color : transparent;
    border-radius : 10px;
    border: 1.5px solid ${Palette.grayBorderColor};
    padding : 10px;
    width : 100%;
    outline : none;
    color: white;
    font-size : 0.9em;
    font-weight: 500;
    transition : border-color .5s;

    &:focus{
        border-color : white;
    }
`

class TextInput extends React.Component<{}, {}> {
    render() { 
        return ( 
            <div>
                <Input type="text"/>
            </div>
         );
    }
}
 
export default TextInput;