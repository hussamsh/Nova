import * as React from 'react';
import styled from 'styled-components';

interface margins {
    marginTop? : string , 
    marginBottom? : string, 
    marginLeft? : string , 
    marginRight? : string
}

interface inputs {
    marginTop? : string , 
    marginBottom? : string, 
    marginLeft? : string , 
    marginRight? : string,
    value? : string,
    type? : string,
    onChange? : Function
}

const InputField = styled.input<margins>`
    transition : border-color .5s;
    margin: 0px;
    background-color : rgba(240, 240, 240, 0.2);
    padding : 10px;
    width : 100%;
    outline : none;
    border-radius: 10px;
    color: black;
    font-size : 0.9em;
    font-weight: 600;
    border: 3px solid transparent;


    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    margin-left: ${props => props.marginLeft};
    margin-right:  ${props => props.marginRight};
`

export default class Input extends React.Component<inputs, {}> {

    private inputElementRef = React.createRef<HTMLInputElement>();

    render() {
        return(
            <InputField ref={this.inputElementRef} marginBottom={this.props.marginBottom} marginTop={this.props.marginTop} marginLeft={this.props.marginLeft} marginRight={this.props.marginRight} value={this.props.value} type={this.props.type} onBlur={() => {this.onBlurred()}} onFocus={() => {this.onFocused()}} onChange={e => {this.onValueChanged(e)}} />
        )
    }

    onValueChanged(e){
        if(this.props.onChange != undefined){
            this.props.onChange(e)
        }
    }

    onFocused(){
        this.inputElementRef.current.style.borderColor = "#1972FE";
    }

    onBlurred(){
        this.inputElementRef.current.style.borderColor = "transparent";
    }

    getValue() : String {
        return this.inputElementRef.current.value;
    }
}

