import React, { Component, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Task.css'

class Task {
    constructor(name, desc, due, id) {
        this.name = name;
        this.desc = desc;
        this.due = due;
        this.id = id;
    }

    render() {
        return (
            <div className='taskInfo'>
                {this.name}
            </div>
        )
    };

};


function Tasks(props) {

    const [todoTask, setTodoTask] = useState([new Task('woa', 'weee', '10/10/22'), new Task('woooooo', 'weee', '10/10/22')]);
    const [wipTask, setWipTask] = useState([]);
    const [doneTask, setDoneTask] = useState([]);

    const createTask = () => {
        setTodoTask(todoTask.concat(new Task('wa', 'wa', 'wa')));
    };


    const user = this.props.user;
    const [snapshot, loading, error] = useList(scrum_db.getReference(`users/${user.uid}`));


    return (
        <div>
            <button onClick={createTask}> hi</button>
            <div className='taskParent'>
                <div className='taskBox'>
                    <div className='taskHeader'>
                        TODO
                    </div>
                    <ul>{todoTask.map(task => <li className='list'> {task.render()}</li>)} </ul>
                </div>

                <div className='taskBox'>
                    <div className='taskHeader'>
                        WIP
                    </div>
                    <ul>{wipTask.map(task => <li key={task}> {task.name}</li>)} </ul>
                </div>

                <div className='taskBox'>
                    <div className='taskHeader'>
                        DONE
                    </div>

                    <ul>{doneTask.map(task => <li key={task}> {task}</li>)} </ul>
                </div>
            </div>
        </div>

    );

}

export default Tasks;