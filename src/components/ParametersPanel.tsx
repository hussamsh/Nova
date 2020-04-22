import * as React from 'react';
import LabeledTextInput from './LabeledTextInput';


const textInputStyle = {
    marginTop : "10px"
}

interface ParameterValue {
    name : String,
    value : number
}

class ParametersPanel extends React.Component<{ params : Array<{symbol : String, name : String}>}, {}> {

    inputElements;

    inputValues : Array<ParameterValue> = new Array();
    references  : Array<React.RefObject<LabeledTextInput>> = [];

    mainWrapperRef = React.createRef<HTMLDivElement>();
    render() { 
        
        this.inputElements = this.props.params.map( (element , index ) => {
            let labelText = element.name  + " (\\(" + element.symbol + "\\))";
            let reference = React.createRef<LabeledTextInput>();
            this.references[index] = reference;

            return (
                <LabeledTextInput name={element.name} ref={reference} onChange={(e) => this.onValueChange(element.name , e.target.value)} type="number"  style={textInputStyle} label={labelText} key={index} />
            )
        });

        return (  
            <div ref={this.mainWrapperRef} >
                {this.inputElements}
            </div>
        );
    }

    onValueChange(name , value){
        this.inputValues[name] = value;
    }

    getParamsInput() : Array<ParameterValue>{
        return this.inputValues;
    }

    showMissingValueMessage(name : String){

        let index = this.inputElements.findIndex( element => {
            return element.props.name == name
        })

        let wantedElement = this.references[index];
        wantedElement.current.triggerTooltip();
    }
    
}
 
export default ParametersPanel;