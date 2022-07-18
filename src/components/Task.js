import React, { Component, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Task.css'

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


    const user = props.user;
    const boardID = user.tables[0];
    const [snapshot, loading, error] = useList(scrum_db.getReference(`tables/table1`));

    if (snapshot) {

        const tasks = snapshot.map((v) => { return new Task(v.key, v.val()) });
        return (
            <div>
                <button onClick={createTask}> hi</button>
                <div className='taskParent'>
                    <div className='taskContainer'>
                        <div className='taskHeader'>
                            TODO
                        </div>
                        <ul className='taskList'>{tasks.filter((v) => { return v.type === 0 }).map(task => { return task.render() })} </ul>
                </div>

                <div className='taskContainer'>
                    <div className='taskHeader'>
                        WIP
                    </div>
                    <ul className='taskList'>{tasks.filter((v) => { return v.type === 1 }).map(task => {return task.render()})} </ul>
                </div>

                <div className='taskContainer'>
                    <div className='taskHeader'>
                        DONE
                    </div>

                    <ul className='taskList'>{tasks.filter((v) => { return v.type === 2 }).map(task => {return task.render()})} </ul>
                </div>
            </div>
            </div >

        );
    }

}

export default Tasks;