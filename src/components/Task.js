import React, { Component, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Task.css'
import Popup from './Popup';
import { set, update, remove } from "firebase/database";

const Column = ({taskList, name, type}) => {
    return (
            <div className='taskContainer' type={type}>
                <div className='taskHeader'>
                    {name}
                </div>
                <ul className='taskList'>{taskList.filter((v) => { return v.type == type }).map(task => {return task.render()})} </ul>
        </div>
    );
}


class Task {
    constructor(key, val) {
        this.name = val.name;
        this.description = val.description;
        this.due = val.due;
        this.type = val.type;
        this.id = key;
    }

     delete()
     {   
    //     const tableID = window.location.href.split("/").pop();
    //     remove(scrum_db.getReference("tables/" + tableID + "/" + this.id));
     }

    render() {
        return ( 
            <li key={this.id} className="taskBox" draggable={true} id={this.id} onClick={() => this.delete()}>
                <button className="taskButton" onClick={this.displayInfo}>
                    {this.name}
                </button>
            </li>
        );
    }
}



function Tasks(props) {
    const url = window.location.href;
    const tableID = url.split("/").pop();
    const ref = scrum_db.getReference(`tables/${tableID}`);
    const [snapshot, loading, error] = useList(ref);

    const [showPopup, setShowPopup] = useState(false);
    
    if (!snapshot) {
        return <div>error.</div>;
    }
    var tasks = snapshot.map((v) => {
        return new Task(v.key, v.val());
    });
    tasks = [...new Map(tasks.map((v) => [v.id, v])).values()];


    // used for drag and drop
    let targetBox = 0;
    // get all the "containers" or columns that hold the task
    const containers = document.querySelectorAll(".taskContainer");
    // get all of the task boxes. We want to drag these around.
    const draggables = document.querySelectorAll(".taskBox");

  

    // iterate through all the task boxes, if one is being dragged, we give it the .dragging class
    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        })
    });

    

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragend', () => {

            const task = tasks.find(tempTask => {
                return tempTask.id == draggable.id;
            });

            // if it was a task that was dropped, 
            if (task)
            {
                if (targetBox && task.type != targetBox) 
                {
                    // this just updates the
                    task.type = targetBox;
                    scrum_db.editTask(tableID, task);
                    console.log("updated: " + targetBox);
                }
            }
            draggable.classList.remove('dragging');
        })
    });


    containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
            e.preventDefault(); // this changes the icon when you drag something over it.
            targetBox = e.target.getAttribute('type');
        });
    });


    return (
        <div>
            <div className='secondaryNav'>
                <button className='taskButton' onClick={() => setShowPopup(true)}>Create New Task</button>
            </div>
            <div>

                    <div className='taskParent'>
                        <Column taskList={tasks} type={0} name='TODO'/>
                        <Column taskList={tasks} type={1} name='WIP'/>
                        <Column taskList={tasks} type={2} name='DONE'/>
                </div>
            </div>
                <Popup onClose={() => setShowPopup(false)} show={showPopup} table_id={tableID}/>
        </div>
    );
}

export default Tasks;
