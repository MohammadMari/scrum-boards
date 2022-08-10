import React, { Component, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Task.css'
import Popup from './Popup';
import { set, update, remove } from "firebase/database";
import PopupTable from './PopupTable';
import TaskInfoPopup from './TaskInfoPopup';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

function Column(props) {
    return (
        <div className='taskContainer' type={props.columnId}>
            <div className='taskHeader'>
                {props.name}
            </div>
            <Droppable droppableId={props.columnId.toString()} key={props.columnId}>
                {(provided) => (

                    <div className='taskList'
                        ref={provided.innerRef}
                        {...provided.droppableProps}>

                        {props.taskList.filter((v) => { return v.type == props.columnId }).map((task, index) => {
                            return (
                                <Draggable key={task.id} draggableId={task.id} index={index} disableInteractiveElementBlocking={true}>
                                    {(provided) => (

                                        <div key={task.id} className="taskBox" id={task.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>


                                            <button className="taskButton" onClick={() => {props.setPopupTask(task); props.setShowInfo(true)}}>
                                                {task.name}
                                            </button>


                                        </div>

                                    )}

                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
        </div>
    )
}


class Task {
    constructor(key, val) {
        this.name = val.name;
        this.description = val.description;
        this.due = val.due;
        this.type = val.type;
        this.id = key;
        this.task = val;


    }
}



function Tasks(props) {
    const url = window.location.href;
    const tableID = url.split("/").pop();
    const ref = scrum_db.getReference(`tables/${tableID}`);
    const [snapshot, loading, error] = useList(ref);

    const [showPopup, setShowPopup] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const [popupTask, setPopupTask] = useState('');

    if (!snapshot) {
        return <div>error.</div>;
    }
    var tasks = snapshot.map((v) => {
        return new Task(v.key, v.val());
    });
    tasks = [...new Map(tasks.map((v) => [v.id, v])).values()];

    /*
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
        });

        draggable.addEventListener('click',() => {
            
            let tempTask = tasks.find(tempTask => {
                return tempTask.id == draggable.id;
            });


            setPopupTask(tempTask);
            setShowInfo(true);
        });
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
    */

    const onDragEnd = (results) => {
        if (!results.destination) return;
        const { source, destination } = results;

        console.log(results);

        if(source.droppableId !== destination.droppableId) {
           const taskDragged = tasks.find(v => {
                return results.draggableId == v.id;
           });

           console.log(taskDragged);

           taskDragged.type = destination.droppableId;
           scrum_db.editTask(tableID, taskDragged);
        }
    };



    return (
        <div>
            <div className='secondaryNav'>
                <button className='taskButton' onClick={() => setShowPopup(true)}>Create New Task</button>
            </div>
            <div>


                <div className='taskParent'>
                    <DragDropContext onDragEnd={onDragEnd}>

                        <Column taskList={tasks} columnId={0} name='TODO' setShowInfo={setShowInfo} setPopupTask={setPopupTask}/>

                        <Column taskList={tasks} columnId={1} name='WIP' setShowInfo={setShowInfo} setPopupTask={setPopupTask}/>

                        <Column taskList={tasks} columnId={2} name='DONE' setShowInfo={setShowInfo} setPopupTask={setPopupTask}/>

                    </DragDropContext>
                </div>


            </div>
            <Popup onClose={() => setShowPopup(false)} show={showPopup} table_id={tableID} />
            <TaskInfoPopup onClose={() => setShowInfo(false)} show={showInfo} task={popupTask} table_id={tableID} />
        </div>
    )
}

export default Tasks;
