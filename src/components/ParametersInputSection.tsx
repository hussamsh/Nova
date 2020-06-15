import * as React from 'react';
import TopLabelTextInput from './ParametersInput';
import { v4 as uuidv4 } from 'uuid';



interface ParameterValue {
    name : String,
    value : String
}

class ParametersInputSection extends React.Component<{ params : Array<{symbol : String, name : String}>}, {}> {

    inputElements;
    references  : Array<React.RefObject<TopLabelTextInput>> = [];

    render() { 
        
        this.inputElements = this.props.params.map( (element , index ) => {
            let labelText = " \\(" + element.symbol + "\\)";
            let reference = React.createRef<TopLabelTextInput>();
            this.references[index] = reference;

            return (
                <TopLabelTextInput name={element.name} ref={reference} type="number" style={{marginTop:"10px"}} label={labelText} key={uuidv4()}></TopLabelTextInput>
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