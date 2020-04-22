import * as React from 'react';
import styled from 'styled-components';
import Palette from '../palette';
import Button from './Button';

let listener = window["ipcRenderer"]

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
    font-size : 0.8em;
    font-weight: 300;
    border-radius : 10px;
    border : 0px; 
`
const Wrapper = styled.div`
    display : flex;
    border: 1.5px solid ${Palette.grayBorderColor};
    border-radius : 10px;
    transition : border-color .5s;
`


const BrowseButton = styled.button`
    border : 0px;
    border-radius: 4px;
    color : ${Palette.materialBlack};
    background-color : ${Palette.accentColor};
    align-self : flex-end;
    margin-top: 5px;
    padding: 7px;
    font-weight: 900;
    font-size: 0.8em;
    height: 50%;

    &:focus{
        outline : none;
    }
`

const Parent = styled.div`
    display : flex;
    flex-direction : column;
`

export default class PathLabeledInput extends React.Component<{ style ?: Object}, {}> {
    
    private wrapperRef = React.createRef<HTMLDivElement>();
    private textRef = React.createRef<HTMLInputElement>();

    public render() {
        return (
            <Parent>
                <Wrapper style={this.props.style} id="labeled-text-wrapper" ref={this.wrapperRef}>
                    <TextLabel >Output Path</TextLabel>
                    <Input id="dirs" ref={this.textRef} type="text" onBlur={() => {this.onBlurred()}} onFocus={() => {this.onFocused()}}/>
                </Wrapper>
                <BrowseButton id="browse-btn"> <i className="far fa-folder-open"></i> Browse</BrowseButton>
            </Parent>
            
        );
    }

    componentDidMount() {

        listener.on('folder-selected' , (event , path) => {
            this.textRef.current.value = path;
        })

        document.getElementById('browse-btn').addEventListener('click', (e) => {
            listener.send('select-dirs')
        })
    }

    onFocused(){
        this.wrapperRef.current.style.borderColor = "white";
    }

    onBlurred(){
        this.wrapperRef.current.style.borderColor = Palette.grayBorderColor;
    }

    getPath() : String {
        return this.textRef.current.value.toString();
    }

}
