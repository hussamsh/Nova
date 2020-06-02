import * as React from 'react';
import styled from 'styled-components';
import Palette from '../palette';
const { dialog  } = require('electron').remote
import Tippy, { tippy } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/animations/shift-away.css'
var uri2path = require('file-uri-to-path');

const DragDropImage = styled.img`
    height : 90px;
    width : 90px;
    margin-bottom : 20px;
`

const PlaceholderText = styled.p`
    color : white;
    text-align: center;
    font-weight: 200;
    font-size: 1.7em;

    span {
        color : ${Palette.accentColor};
        font-weight : 300;
        cursor : pointer;
    }
`

const PlaceholderWrapper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : column;
    width : 100%;
    height : 100%;
`

const MainWrapper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    width : 100%;
    height : 100%;
    overflow: hidden;
`

const ImageMain = styled.img`
    max-width: 100%;
    max-height: 100%;
    display: none;
    /* object-fit: cover; */
`

export default class ImageInput extends React.Component {
  
    placeHolderVisible : boolean = true;
    mainImageElement : HTMLImageElement;
    private tippyElement;

  
    render() {
        return (
            
                <MainWrapper id="drag-area"> 
                    <PlaceholderWrapper id="placeholder-wrapper">
                        <DragDropImage src="./assets/images/drag-drop.png" />

                        <Tippy 
                            onCreate={ tip => {this.tippyElement = tip}}
                            theme="warning"
                            placement="bottom"
                            animation="shift-away"
                            trigger="manual"
                        >
                            <PlaceholderText>Drag & Drop your desired image <br/> or <span onClick={() => this.showFilePickerDialog()}>Browse</span></PlaceholderText>
                        </Tippy>

                    </PlaceholderWrapper>
                    
                    
                    <ImageMain id="image-main"  />

                        
                </MainWrapper>
            
        );
    }

    showFilePickerDialog(){         

        let result = dialog.showOpenDialogSync({
            filters : [
            {
                name: 'Images', 
                extensions: ['jpg', 'png', 'gif']
            }
            ],
            properties : ['openFile']
        });

        if(result != undefined){
            this.setImageSource(result[0]);
        }

    }

    componentDidMount() {
        this.mainImageElement = document.getElementById("image-main") as HTMLImageElement
        let dragArea = document.getElementById("drag-area");


        dragArea.ondragenter = () => {
            return false;
        }

        dragArea.ondragover = () => {
            return false;
        } 

        dragArea.ondragleave = () => {
            return false;
        }

        dragArea.ondrop = (e) => {
            e.preventDefault();

            let draggedFiles = e.dataTransfer.files;

            if (draggedFiles.length > 1){
                //TODO : notifications
                console.log("Cant handle more than one file")
                return ;
            }

            let file = draggedFiles[0];
            this.setImageSource(file.path);

        }
    }

    setImageSource(source){
                
        if(this.placeHolderVisible){
            let placeholderWrapper = document.getElementById("placeholder-wrapper");
            placeholderWrapper.style.display = "none";
            this.placeHolderVisible = false;
        }

        this.mainImageElement.src = source;
        this.mainImageElement.style.display = "block";
    }


    getImagePath(){
        return uri2path(this.mainImageElement.src);
    }


    triggerErrorTooltip(message : String){
        this.tippyElement.setContent(message);
        this.tippyElement.show();
    }

}
