import * as React from 'react';
import LabeledTextInput from './LabeledTextInput';


const textInputStyle = {
    marginTop : "10px"
}

class ParametersPanel extends React.Component<{ params : Array<{symbol : String, name : String}>}, {}> {

    inputs;
    
    

    render() { 
        
        this.inputs = this.props.params.map( (element , index ) => {
            let labelText = element.name  + " (\\(" + element.symbol + "\\))";
            return <LabeledTextInput style={textInputStyle} label={labelText} key={index    } />
        });

        return (  
            <div>
                {this.inputs}
            </div>
        );
    }

    


    
}
 
export default ParametersPanel;