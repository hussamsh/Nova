import * as React from 'react';
import LabeledTextInput from './LabeledTextInput';
import { v4 as uuidv4 } from 'uuid';

const textInputStyle = {
    marginTop : "10px"
}

interface ParameterValue {
    name : String,
    value : String
}

class ParametersInputSection extends React.Component<{ params : Array<{symbol : String, name : String}>}, {}> {

    inputElements;
    references  : Array<React.RefObject<LabeledTextInput>> = [];

    render() { 
        
        this.inputElements = this.props.params.map( (element , index ) => {
            let labelText = element.name  + " (\\(" + element.symbol + "\\))";
            let reference = React.createRef<LabeledTextInput>();
            this.references[index] = reference;

            return (
                <LabeledTextInput name={element.name} ref={reference} type="number"  style={textInputStyle} label={labelText} key={uuidv4()}></LabeledTextInput>
            )
        });

        return (  
            <div>
                {this.inputElements}
            </div>
        );
    }

    getParamsInput() : Array<ParameterValue>{

        return this.inputElements.map( (e , index) => {
            let elementRef =  this.references[index];
            return {
                name : elementRef.current.props.name,
                value : elementRef.current.getValue().toString()
            }
        });

    }

    onInputParamsValidationFail(name : String , message : String){

        let index = this.inputElements.findIndex( element => {
            return element.props.name == name
        })

        let wantedElement = this.references[index];
        wantedElement.current.triggerErrorTooltip(message);
    }
    
}
 
export default ParametersInputSection;