import * as React from 'react';
import styled from 'styled-components';
import Palette from '../palette';


const MainWrapper = styled.div`
    background-color : rgba(0, 0, 0, 0.8);
    position : absolute;
    height: 100%;
    width: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`

const SpinnerWrapper = styled.div`
    display: block;
`

const ProgressText = styled.p`
    color : ${Palette.accentColor};
    font-family: 'Roboto';
    font-weight : 500;
    font-style : italic;
`  


const CancelButton = styled.button`
    font-size : 0.7em;
    margin-top : 20px;
`

export class Spinner extends React.Component<{onCancelClicked ?: Function} , {}> {
   
    wrapper : HTMLDivElement;
    progress : HTMLParagraphElement;
    
    render() {

        return (
            <MainWrapper id="spinner">
                <SpinnerWrapper className="semipolar-spinner" >
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                </SpinnerWrapper>

                <ProgressText id="progress"></ProgressText>

                <CancelButton type="button" className="btn btn-outline-light" onClick = {() => this.props.onCancelClicked()}>Cancel</CancelButton>

            </MainWrapper>
        )
    }

    componentDidMount() {
        this.wrapper = document.getElementById("spinner") as HTMLDivElement;
        this.progress = document.getElementById("progress") as HTMLParagraphElement;
    }

    setText(text : string){
        this.progress.innerHTML = text;
    }

    show(){
        this.wrapper.style.display = "flex";
    }

    hide(){
        this.wrapper.style.display = "none";
    }

}

