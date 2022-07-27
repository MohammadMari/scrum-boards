import React, { Component, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Boards.css'
import { Navigate } from "react-router-dom";



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


class tableTile {
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




function Boards(props) {
    

    let set = undefined;
    const ref = scrum_db.getReference(`tables`);
    const userRef = scrum_db.getReference('users/' + props.user.uid + '/tables')
    const [snapshot, loading, error] = useList(userRef);

    //console.log(userRef);
    const user = props.user;
    const boardID = user.tables[0];

    
    const createTable = () => {
        let tableRef = push(ref, {table: "temp"} );
        let tableName = tableRef.key;
        push(userRef, {tables: tableName});
    };

    const taskList = snapshot.map((v) => { return new tableTile(v.key, v.val()) });

    return (
        // <DragDropContext onDragEnd={onDragEnd}>
            <div>
                
                <div>
                        <ul className='taskList'>{taskList.map(task => {return task.render()})} </ul>
                        <button onClick={() => createTable()}> hi </button>
                </div>
            </div>
        // </DragDropContext>
    );
}

export default Boards;