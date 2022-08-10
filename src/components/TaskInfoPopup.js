import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import './Popup.css'
import 'react-datepicker/dist/react-datepicker.css'
import { scrum_db } from "../Database";
import { set, update, remove } from "firebase/database";

function TaskInfoPopup (props) {

    
    const [task_name, setTaskName] = useState('');
    const [task_description, setTaskDescription] = useState('');
    const [task_due, setTaskDue] = useState('');
    const [task_type, setTaskType] = useState(1);

    
    console.log('here');
    if (!props.show) {
        return (null);
    }
   
    console.log(props);

    const delTask = () => {
        remove(scrum_db.getReference("tables/" + props.table_id + "/" + props.task.id));
        props.onClose();
    };

    return (
        <div className="popup">
            <div className="popup-window">
                <div className="popup-header">
                    <h4 className="popup-title">Create a Task</h4>
                </div>
                <div className="popup-body">
                    <form className="popup-form">
                        <label for="taskName">Task Name: {props.task.name}</label>
                        <br />
                        <label>Due Date: {props.task.due}</label>
                        <br />
                        <label for="Notes">Task Notes: {props.task.description}</label>
                        <br />

                    </form>
                </div>
                <div className="popup-footer">
                    <button onClick={delTask} className="footer-buttons">Delete</button>
                    <button onClick={props.onClose} className="footer-buttons">Close</button>
                </div>
            </div>
        </div>
    )
}


export default TaskInfoPopup;