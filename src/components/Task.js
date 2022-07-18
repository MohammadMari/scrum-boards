import React, { Component, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Task.css'

class Task{
    constructor(name, desc, due, id) {
        this.name = name;
        this.desc = desc;
        this.due = due;
        this.id = id;
    }



    render() {
        return (
            <button className='taskButton' onClick={this.displayInfo}>
                {this.name}
            </button>
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


    //const user = this.props.user;
    //const [snapshot, loading, error] = useList(scrum_db.getReference(`users/${user.uid}`));

        return ( 
        <div>
            <button onClick={createTask}> hi</button>
            <div className='taskParent'>
                <div className='taskContainer'>
                    <div className='taskHeader'>
                        TODO
                    </div>
                    <ul className='taskList'>{todoTask.map(task => <li className='taskBox'> {task.render()}</li>)} </ul>
                </div>

                <div className='taskContainer'> 
                    <div className='taskHeader'>
                        WIP
                    </div>
                    <ul className='taskList'>{wipTask.map(task => <li className='taskBox'> {task.render()}</li>)} </ul>
                </div>

                <div className='taskContainer'> 
                    <div className='taskHeader'>
                        DONE
                    </div>

                    <ul className='taskList'>{doneTask.map(task => <li className='taskBox'> {task.render()}</li>)} </ul>
                </div>
            </div>
        </div>

        );
       
}

export default Tasks;