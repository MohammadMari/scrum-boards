import React, { Component, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import Popup from './Popup';
import './Task.css'

const Column = ({taskList, name}) => {
    return (
            <div className='taskContainer'>
                <div className='taskHeader'>
                    {name}
                </div>
                <ul className='taskList'>{taskList.filter((v) => { return v.type === 1 }).map(task => {return task.render()})} </ul>
            </div>
    );
}


class Task {
    constructor(key, val) {
        this.name = val.name;
        this.desc = val.description;
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
    const createTask = () => {

    };

    // const [state, setState] = useState(initialData)

    const onDragEnd = (result) => {
        const { destination, source } = result;
    }

    const user = props.user;
    const boardID = user.tables[0];
    const [snapshot, loading, error] = useList(scrum_db.getReference(`tables/table1`));

    if (snapshot) {

        const tasks = snapshot.map((v) => { return new Task(v.key, v.val()) });
        return (
             <div>
                <div>
                    <button onClick={createTask}> hi</button>
                    <div className='taskParent'>
                        <Column taskList={tasks} name='TODO'/>
                        <Column taskList={tasks} name='WIP'/>
                        <Column taskList={tasks} name='DONE'/>
                    </div>
                </div>
                <Popup trigger="true">
                    hello
                </Popup>
             </div>
        );
    }

}

export default Tasks;