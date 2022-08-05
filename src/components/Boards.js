import React, { Component, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Boards.css'

class tableTile {
    constructor(key, val) {
        this.tableName = val.table_name;
        this.id = key;
    }

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

    // add popup stuff to this
    const createTable = () => {
        scrum_db.createTable(user.uid, "test_board");
    };

    if (snapshot) {
        var tables = []; // empty array
        if (user.tables) // check if user has any boards so we don't get an error
        {
            tables = snapshot.map((v) => { return new tableTile(v.key, v.val(), props) }).filter(v => { return user.tables.includes(v.id) }); // if user has any boards, load them up
            tables = [...new Map(tables.map(v => [v.id, v])).values()];
        }
        
        // return a list of their boards.
        return (
            <div>
                <div> 
                    <ul className='taskList'>{tables.length ? tables.map(table => { return table.render() }) : "No Boards"} </ul>
                    <button onClick={createTable}> hi </button>
                </div>
            </div>
        );
    }
}

export default Boards;