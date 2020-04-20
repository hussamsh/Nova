import React from 'react';
import DropDown from './DropDown';
import styled from 'styled-components';


const Container = styled.div`
    padding : 15px;
`

const EnceryptionLabel = styled.p`
    color : #7a7e84;
    font-size: 0.82em;
    font-weight: 800;
    margin-bottom: 0px;
`

const ClickableLabel = styled.a`
    color : #f2a365 !important;
    cursor: pointer;
    font-size: 0.8em;
    margin-bottom: 0px;
    margin-left: auto;
    font-weight: 300;

`
 
const LabelWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 5px;
    padding-right: 5px;
`

class ControlsPanel extends React.Component {

    encryptionTypes = ["Double humped Map Encryption" , "Logisitic Map Encrption"]

    render() { 
        return (  
            <Container>
                <div className="encryption-panel">
                    <LabelWrapper>
                        <EnceryptionLabel>ENCRYPTION TYPE</EnceryptionLabel>
                        <ClickableLabel>Learn more</ClickableLabel>
                    </LabelWrapper>
                    <DropDown items={this.encryptionTypes} onClick={this.onEncryptionTypeSelected} />
                </div>      
            </Container>
        );
    }

    onEncryptionTypeSelected(index){
        console.log("Encryption Type of index : " + index + " is selected")
    }
    
}
 

export default ControlsPanel;

