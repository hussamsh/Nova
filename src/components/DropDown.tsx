import * as React from 'react';
import styled from 'styled-components';
import Palette from "../helpers/palette";


const Container = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`

const Button = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-size: 0.9em;
    font-weight: 500;
    padding: 10px;
    border: 1.5px solid ${Palette.grayBorderColor};
    border-radius: 10px;
    cursor: pointer;

    i {
        margin-left: auto;
        font-size: 1.1em;
    }
`

const Content = styled.div`
    position: absolute; 
    background-color : ${Palette.sidePanel};
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border: 1.5px solid #7a7e84;
    max-height : 0px;
    display: none;
    border-radius: 10px;
    border-top: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    transition : max-height .3s;
    overflow: hidden;
    overflow-y : auto;

    div {
        color: #ffffe4;
        padding: 5px;
        font-size: 0.9em;
        font-weight: 300;
        padding-left: 10px;
        display: block;
        cursor : pointer;

        &:hover {
            background-color: #ddd
        }
    }
`

class DropDown extends React.Component<{ items : Array<String> , onClick : Function} , {}> {

    private opened : boolean = false;
    private contentElement: HTMLElement;
    private buttonElement: HTMLElement;
    private placeHolderTextElement : HTMLElement;
    private dropdownList;

    constructor(props){
        super(props);
        this.dropdownList = this.props.items.map( (item , index) => {
            return <div key={index} data-index={index} onClick={(e) => {this.itemClicked(item , index)}}>{item}</div>;
        });
    }

    render() {
        return (
            <div className="dropdown-main">
                <Container>
                    <Button id="dropdownbtn"><span id="dropdown-placeholder-text">{this.props.items[0]}</span><i className="fas fa-caret-down"></i></Button>
                    <Content id="content-wrapper">
                        {this.dropdownList}
                    </Content>
                </Container>
            </div>
        )
    }


    dosmth(){
        console.log("Did smth");
    }

    componentDidMount() {

        this.contentElement = document.getElementById("content-wrapper")
        this.buttonElement = document.getElementById("dropdownbtn");
        this.placeHolderTextElement = document.getElementById("dropdown-placeholder-text");

        $(document).click(() => {
            this.hide();
        })

        $('#dropdownbtn').click((e) => {
            this.flip();
            e.stopPropagation();
        })
        
    }

    itemClicked(item , index){
        this.placeHolderTextElement.innerHTML = item;
        this.props.onClick(index);
    }

    flip(){
        if(this.opened){
            this.hide();
        }else{
            this.show();
        }
    }

    show(){
        
        this.contentElement.style.display = "block"

        setTimeout(() => {
            this.contentElement.style.maxHeight  = "100px"
            this.buttonElement.style.borderBottom = "0px";
            this.buttonElement.style.borderBottomLeftRadius = "0px";
            this.buttonElement.style.borderBottomRightRadius = "0px";
        }, 10);
        this.opened = true;
    }

    hide(){

        this.contentElement.style.maxHeight = "0px"

        setTimeout(() => {
            this.contentElement.style.display = "none"
            this.buttonElement.style.borderBottomLeftRadius = "10px";
            this.buttonElement.style.borderBottomRightRadius = "10px";
            this.buttonElement.style.border = "1.5px solid #7a7e84";
        }, 200);

        this.opened = false;
    }
}

export default DropDown;