import React, { Component, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useList } from 'react-firebase-hooks/database';
import Account from '../Account';
import { scrum_db } from '../Database';
import './Boards.css'

const Column = ({ taskList, name, type }) => {
    return (
        <div className='taskContainer'>
            <div className='taskHeader'>
                {name}
            </div>
            <ul className='taskList'>{taskList.filter((v) => { return v.type === type }).map(task => { return task.render() })} </ul>
        </div>
    );
}


class tableTile {
    #id;
    constructor(key, tableName) {
        this.tableName = tableName;
        this.id = key;
    };

    redirect() {
        console.log(this.id);
    };
    

    redirect() {
        window.location.href = "/boards/" + this.id;
    }

    render() {
        return (
            <li key={this.id} className='taskBox'>
                <button className='taskButton' onClick={() => this.redirect() }>
                    {this.tableName}
                </button>
            </li>
        )
    };
};


function Boards(props) {


    const [snapshot, loading, error] = useList(scrum_db.getReference('tables'));
    const user = props.user;

    const url = window.location.href;
    const lastSegment = url.split("/").pop();
    


    const createTable = () => {
        scrum_db.createTable(user.uid, "test_board");
    };

    if (snapshot) {
        console.log(snapshot);
        var tables = snapshot.map((v) => { return new tableTile(v.key, v.val(), props) }).filter(v => { return user.tables.includes(v.id) });
        tables = [...new Map(tables.map(v => [v.id, v])).values()];

        return (
            // <DragDropContext onDragEnd={onDragEnd}>
            <div>

                <div>
                    <ul className='taskList'>{tables.map(table => { return table.render() })} </ul>
                    <button onClick={createTable}> hi </button>
                </div>
            </div>
            // </DragDropContext>
        );
    }
}

export default Boards;