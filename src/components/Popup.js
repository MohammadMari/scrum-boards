import React from "react";
import './Popup.css'

function Popup(props){
    return(props.trigger) ? (
        <div className="popup">
            <form className="popup-inner">
                <div className="popupHeader">
                    Create a Task
                    <button className="close-button" onClick={() => props.setTrigger(false)}>close</button>
                        { props.children }
                </div>
            </form>
        </div>
    ) : "";
}

export default Popup