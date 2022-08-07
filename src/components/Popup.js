import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";
import './Popup.css'
import 'react-datepicker/dist/react-datepicker.css'

function Popup (props){
    if(!props.show){
        return null
    }


    return(
        <div className="popup">
            <div className="popup-window">
                <div className="popup-header">
                    <h4 className="popup-title">Create a Task</h4>
                </div>
                <div className="popup-body">
                    <form className="popup-form">
                        <label for="taskName">Task Name:</label>
                        <input className="popup-input" type="text" id="taskName"></input>
                        <br/>
                        <label>Due Date:</label>
                        <input className="popup-input" type="date" id="dueDate"></input>
                        <br/>
                        <label for="Notes">Task Notes: </label>
                        <input className="popup-input" type="text" id="Notes"/>

                    </form>
                </div>
                <div className="popup-footer">
                    <button onClick={props.onClose} className="cancel-button">cancel</button>
                    <button className="submit-button">submit</button>
                </div>
            </div>
        </div>
    )
    
}

export default Popup