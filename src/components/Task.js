import React, { Component, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Task.css'
import Popup from './Popup';
import { set, update } from "firebase/database";

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


    render() {
        return ( 
            <li key={this.id}
                className="taskBox"
                draggable={true}
                id={this.id}>
                
                <button className="taskButton" onClick={this.displayInfo}>
                    {this.name}
                </button>
            </li>
        );
    }
}

function findTask(task, id)
{
    if (task.id == id)
        return task;
}

function Tasks(props) {
    const url = window.location.href;
    const lastSegment = url.split("/").pop();
    const user = props.user;
    const tableID = lastSegment;
    const ref = scrum_db.getReference(`tables/${lastSegment}`);
    const [snapshot, loading, error] = useList(ref);
    const [presentTodo, setPresentTodo] = useState("");

    const createTask = () => {
        scrum_db.createTask(tableID, {
            description: "wa",
            due: "poof",
            name: "yeet",
            type: 1,
        });
    };
    const [showPopup, setShowPopup] = useState(false);

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


    // if its not being dragged we remove that class as we no longer need it on there.
    draggables.forEach((draggable) => {
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
    });

    // for each container
    containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
        
            e.preventDefault(); // this changes the icon when you drag something over it.

            // get task box we are dragging
            const draggable = document.querySelector(".dragging");


            // here is where im having issues.
            // so I check to see if we have an item that we are dragging towards it, and if we have tasks.
            if (draggable && tasks) {

                // this is to later update the task if needed. I probably should only do this when we actually need to update the task.
                    const taskRef = scrum_db.getReference("tables/" + lastSegment + "/" + draggable.id);

                    // I want the actual task, not just its little div thingy or whatever.
                    // So I go through the list, use the div id to find the actual task.
                    const task = tasks.find(tempTask => {
                    if (tempTask.id == draggable.id)
                        return true;
                    });

                    console.log(task);
                
                    // e target is the box we are dragging towards.
                    if (e.target)
                    {
                        // so I found that the boxes are numbered using ID, so we can just take the ID...
                        // ... using e.target.id, and just change the info in the database, and that should ...
                        // .. make it draggable.
                        const targetBox = e.target.getAttribute('type');
                        console.log(e.target);
                        // console.log("task type: "  + task.type);
                        console.log("target: " + e.target.getAttribute('type')); // now my issue is, sometimes targetBox is blank for whatever reason.
                        
                        // this check is useless because if targetBox is blank, its obv not going to be equal to whatever box task is in.
                        if (targetBox && task.type != targetBox) 
                        {
                            // this just updates the
                            task.type = targetBox;
                            scrum_db.editTask(tableID, task);
                            console.log("updated: " + targetBox);
                        }
                    }
                }
        });
    });

    if (!snapshot) {
        return <div>error.</div>;
    }
    var tasks = snapshot.map((v) => {
        return new Task(v.key, v.val());
    });
    tasks = [...new Map(tasks.map((v) => [v.id, v])).values()];


    return (
        <div>
            <div>
                <button onClick={createTask}> hi</button>
                    <button onClick={() => setShowPopup(true)}>Create New Task</button>
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
