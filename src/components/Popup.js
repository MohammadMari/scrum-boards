import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import './Popup.css'
import 'react-datepicker/dist/react-datepicker.css'
import { scrum_db } from "../Database";

function Popup(props) {
    const [task_name, setTaskName] = useState('');
    const [task_description, setTaskDescription] = useState('');
    const [task_due, setTaskDue] = useState('');
    const [task_type, setTaskType] = useState(1);

    const validate_task = () => {
        const newTask = {
            name: task_name,
            description: task_description,
            due: task_due,
            type: task_type
        };

        scrum_db.createTask(props.table_id, newTask);
        props.onClose();
    };

    if (!props.show) {
        return (null);
    }


    return (
        <div className="popup">
            <div className="popup-window">
                <div className="popup-header">
                    <h4 className="popup-title">Create a Task</h4>
                </div>
                <div className="popup-body">
                    <form className="popup-form">
                        <label for="taskName">Task Name:</label>
                        <input className="popup-input" type="text" id="taskName" onChange={(e) => setTaskName(e.target.value)}></input>
                        <br />
                        <label>Due Date:</label>
                        <input className="popup-input" type="date" id="dueDate" onChange={(e) => setTaskDue(e.target.value)}></input>
                        <br />
                        <label for="Notes">Task Notes: </label>
                        <input className="popup-input" type="text" id="Notes" onChange={(e) => setTaskDescription(e.target.value)}/>

                    </form>
                </div>
                <div className="popup-footer">
                    <button onClick={props.onClose} className="cancel-button">cancel</button>
                    <button onClick={ validate_task } className="submit-button">submit</button>
                </div>
            </div>
        </div>
    )

}

export default Popup