
import React from 'react'

class TopControlButtons extends React.Component {

    render(){
        return (
            <div className="row justify-content-end">
                <button className="circular ui icon mini button control-button" style={{fontSize:".5rem"}}>
                    <i className="icon window minimize"></i>
                </button>
                <button className="circular ui icon mini button control-button" style={{fontSize:".5rem"}}>
                    <i className="icon window maximize"></i>
                </button>
                <button className="circular ui icon mini button control-button" style={{fontSize:".5rem"}}>
                    <i className="icon close"></i>
                </button>
            </div>   
        )
    }
}

export default TopControlButtons;