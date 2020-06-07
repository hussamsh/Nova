
import React from 'react'
import styled from 'styled-components';
import {remote} from 'electron'

const ControlButton = styled.button`
    padding : 10px;
    padding-left : 20px;
    padding-right : 20px;
    -webkit-app-region: no-drag;
    background-color: transparent;
    color : white;
    border : 0px;
    font-weight : 200;
    font-size: 0.7em;
    transition : background-color .3s;

    &:focus {
        outline : none;
    }

    &:hover{
        background-color : #52555A;
    }
`

const CloseButton = styled(ControlButton)`
    font-size: .9em;
    &:hover {
        background-color : #DF1414;
    }
`

const Wrapper = styled.div`
    display : flex;
    flex-direction : row-reverse;
`

class TopControlButtons extends React.Component {

    
    changeSizeIcon : HTMLElement;

    render(){
        return (
            <Wrapper className="ml-auto">
                <CloseButton onClick={() => remote.getCurrentWindow().close()}>
                    <i className="fas fa-times"></i>
                </CloseButton>
                <ControlButton onClick={() => this.maximize()}>
                    <i id="change-size-icon" className="far fa-window-maximize"></i>
                </ControlButton>
                <ControlButton onClick={() => remote.getCurrentWindow().minimize()}>
                    <i className="far fa-window-minimize"></i>
                </ControlButton>
            </Wrapper>   
        )
    }

    componentDidMount() {
        remote.getCurrentWindow().on('maximize' , () => {
            this.flipIcon();
        })

        remote.getCurrentWindow().on('unmaximize' , () => {
            this.flipIcon();
        })

        this.changeSizeIcon = document.getElementById("change-size-icon");
    }

    maximize(){
        remote.getCurrentWindow().isMaximized() ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize();
    }

    flipIcon(){
        if(remote.getCurrentWindow().isMaximized()){
            this.changeSizeIcon.classList.remove("fa-window-maximize");
            this.changeSizeIcon.classList.add("fa-window-restore");
        }else{
            this.changeSizeIcon.classList.remove("fa-window-restore");
            this.changeSizeIcon.classList.add("fa-window-maximize");  
        }
    }
}

export default TopControlButtons;