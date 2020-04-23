import * as React from 'react';
import styled from 'styled-components';
import Palette from '../palette';
import LabeledTextInput from './LabeledTextInput';

let listener = window["ipcRenderer"]

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

export default class OutputPathSelectSection extends React.Component<{ style ?: Object}, {outputPath : string}> {
    
    private outputPathInputRef = React.createRef<LabeledTextInput>();
    private outputPath : string = "";

    constructor(props){
        super(props);
        this.state = {
            outputPath : this.outputPath
        }
    }

    public render() {
        return (
            <Parent>
                <LabeledTextInput onChange={(e) => this.onPathChanged(e.target.value)} value={this.state.outputPath} ref={this.outputPathInputRef} name="outputPath" label="Output Folder" type="text" />
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
        return this.outputPathInputRef.current.props.value;
    }

    onPathValidationFail(message : String){
        this.outputPathInputRef.current.triggerErrorTooltip(message);
    }

}
