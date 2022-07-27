import React, { Component, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import Popup from './Popup';
import './Task.css'

import {
    ref,
    onValue,
    push,
    update,
    remove
} from 'firebase/database';

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
    
    const ref = scrum_db.getReference(`tables/table1`);

    const user = props.user;
    const boardID = user.tables[0];
    const [snapshot, loading, error] = useList(ref);
    const [presentTodo, setPresentTodo] = useState('');

    
    const createTask = () => {
        push(ref, {
            description:  'wa',
            due: 'poof',
            name: 'yeet',
            type: 1
        }
        );  
    };

    // const [state, setState] = useState(initialData)

    const onDragEnd = (result) => {
        const { destination, source } = result;
    }

    


    if (snapshot) {
        const tasks = snapshot.map((v) => { return new Task(v.key, v.val()) });
        return (
             <div>
                <div>
                    <button onClick={createTask}> hi</button>
                    <div className='taskParent'>
                        <Column taskList={tasks} type={0} name='TODO'/>
                        <Column taskList={tasks} type={1} name='WIP'/>
                        <Column taskList={tasks} type={2} name='DONE'/>
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