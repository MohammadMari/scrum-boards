import React, { Component, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Task.css'
import Popup from './Popup';

const Column = ({taskList, name, type}) => {
    return (
            <div className='taskContainer'>
                <div className='taskHeader'>
                    {name}
                </div>
                <ul className='taskList'>{taskList.filter((v) => { return v.type === type }).map(task => {return task.render()})} </ul>
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
            <li key={this.id} className='taskBox'>
                <button className='taskButton' onClick={this.displayInfo}>
                    {this.name}
                </button>
            </li>
        )
    };
};


function Tasks(props) {

    const url = window.location.href;
     const lastSegment = url.split("/").pop();
    const user = props.user;
    const tableID = lastSegment;
    const ref = scrum_db.getReference(`tables/${lastSegment}`);
    const [snapshot, loading, error] = useList(ref);
    const [presentTodo, setPresentTodo] = useState('');

    
    const createTask = () => {
        scrum_db.createTask(tableID, {
            description:  'wa',
            due: 'poof',
            name: 'yeet',
            type: 1
        });
    };

    // const [state, setState] = useState(initialData)

    const onDragEnd = (result) => {
        const { destination, source } = result;
    }

    const [showPopup, setShowPopup] = useState(false)
    


    if (snapshot) {
        var tasks = snapshot.map((v) => { return new Task(v.key, v.val()) });
        tasks = [...new Map(tasks.map(v => [v.id, v])).values()];
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
                <Popup onClose={() => setShowPopup(false)} show={showPopup}/>
             </div>
        );
    }

}

export default Tasks;