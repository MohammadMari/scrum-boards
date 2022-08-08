import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import './Popup.css'
import 'react-datepicker/dist/react-datepicker.css'
import { scrum_db } from "../Database";

function PopupTable(props) {
    const [table_name, setTableName] = useState('');

    const validate_table = () => {

        scrum_db.createTable(props.userid, table_name);
        props.onClose();
    };

    if (!props.show) {
        return (null);
    }


    return (
        <div className="popup">
            <div className="popup-window">
                <div className="popup-header">
                    <h4 className="popup-title">Create a Board</h4>
                </div>
                <div className="popup-body">
                    <form className="popup-form">
                        <label for="taskName">Board Name:</label>
                        <input className="popup-input" type="text" id="tableName" onChange={(e) => setTableName(e.target.value)}></input>
                        <br />

                    </form>
                </div>
                <div className="popup-footer">
                    <button onClick={props.onClose} className="cancel-button">Cancel</button>
                    <button onClick={validate_table} className="submit-button">Submit</button>
                </div>
            </div>
        </div>
    )

}

export default PopupTable;