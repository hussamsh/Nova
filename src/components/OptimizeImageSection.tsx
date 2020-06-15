import * as React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/animations/shift-away.css';


const Wrapper = styled.div`
    margin-top : 20px;
    margin-bottom: 10px;
`

const Label = styled.div`
    color : #9E9E9E;
    letter-spacing: .5px;
    font-size: 0.82em;
    font-weight: 800;
    margin-bottom: 0px;
`

const LabelWrapper = styled.div`
    padding : 0px;
`;

const CautionWrapper = styled.div`
    height : 24px;
    width : 28px;
    border-radius : 999px;
    border : 2px solid #9E9E9E;
    display: none;
    align-items : center;
    justify-content: center;    

    i {
        font-size : 0.7em;
    }

`

export default class OptimizeImageSection extends React.Component {

    private optimize = true;
    private cautionWrapper;

    render() {
        return (

            <Wrapper className="d-flex flex-row align-items-center justify-content-center">
                
                <div className="col-6" style={{padding:'0px'}}>
                <Label>RESIZE IMAGE</Label>
                
                </div>
                
                <LabelWrapper className="col-6 d-flex flex-row">

                    <label className="ml-auto" style={{marginBottom:'0px'}} >
                        <input className="input" type="checkbox" id="toggle" onClick={ () => {this.clicked()}}/>
                        <div className="toggle-wrapper">
                            <span className="selector"></span>
                        </div>
                    </label>

                    <CautionWrapper id="caution-wrapper">

                        <Tippy 
                            content="Resizing is highly recommended to optimize performance"
                            theme="info"
                            placement="top"
                            animation="shift-away"
                            >
                                <i className="fas fa-exclamation" style={{color:'white'}}></i>
                        </Tippy>
                    </CautionWrapper>

                    
                </LabelWrapper>
                

            </Wrapper>
            
        )
    }

    clicked(){
        this.optimize = !this.optimize;
        

        if(!this.optimize){
            this.cautionWrapper.style.display = "flex";
        }else{
            this.cautionWrapper.style.display = "none";

        }
    }

    componentDidMount() {
      this.cautionWrapper = document.getElementById("caution-wrapper") as HTMLDivElement;
    }

    getValue(){
        return this.optimize;
    }

}