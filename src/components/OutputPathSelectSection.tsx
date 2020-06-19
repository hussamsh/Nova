import * as React from 'react';
import styled from 'styled-components';
import Palette from '../helpers/palette';
import Tippy from '@tippyjs/react';
import Input from "./Input";

let listener = window["ipcRenderer"]

const BrowseButton = styled.button`
    border : 0px;
    width: 50%;
    border-radius: 4px;
    color : ${Palette.materialBlack};
    background-color : ${Palette.accentColor};
    align-self : center;
    margin-top: 5px;
    padding: 7px;
    font-weight: 900;
    font-size: 0.8em;
    height: 50%;

    &:focus{
        outline : none;
    }
`

const Label = styled.p`
    color : #9E9E9E;
    letter-spacing: .5px;
    font-size: 0.82em;
    font-weight: 800;
    margin-bottom: 0px;
`

const Parent = styled.div`
    display : flex;
    flex-direction : column;
`

export default class OutputPathSelectSection extends React.Component<{ style ?: Object}, {outputPath : string}> {
    
    private outputPathInputRef = React.createRef<Input>();
    private outputPath : string = "";
    private tippyElement;

    constructor(props){
        super(props);
        this.state = {
            outputPath : this.outputPath
        }
    }

    public render() {
        return (
            <Parent>
                <Tippy 
                    onCreate={ tip => {this.tippyElement = tip}}
                    theme="warning"
                    placement="left"
                    animation="shift-away"
                    trigger="manual"
                >
                <Label>OUTPUT DIRECTORY</Label>
                    
                </Tippy>
                <Input marginTop="8px" ref={this.outputPathInputRef} type="text" value={this.state.outputPath} onChange={e => {this.onPathChanged(e.target.value)}} />
                <BrowseButton id="browse-btn"> <i className="far fa-folder-open"></i> Browse</BrowseButton>
            </Parent>
            
        );
    }

    componentDidMount() {

        listener.on('folder-selected' , (event , path) => {
            this.onPathChanged(path)
        })

        document.getElementById('browse-btn').addEventListener('click', (e) => {
            listener.send('select-dirs')
        })
    }

    onPathChanged(path){
        this.setState({
            outputPath : path
        });
    }

    getPath() : String {
        return this.outputPathInputRef.current.getValue();
    }

    onPathValidationFail(message : String){
        this.tippyElement.setContent(message);
        this.tippyElement.show();
    }

}
