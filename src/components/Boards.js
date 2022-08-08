import React, { Component, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useList } from 'react-firebase-hooks/database';
import { scrum_db } from '../Database';
import './Boards.css'
import PopupTable from './PopupTable';

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
            <li key={this.id} className='boardBox'>
                <button className='boardTile' onClick={() => this.redirect() }>
                    {this.tableName}
                </button>
            </li>
        )
    };
};

function Boards(props) {
    const [snapshot, loading, error] = useList(scrum_db.getReference('tables'));
    const [showPopup, setShowPopup] = useState(false);
    const user = props.user;


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
                <div className='secondaryNav'>
                    <button className='taskButton' onClick={() => setShowPopup(true)}>Add Board</button>
                </div>
                <div> 
                    <ul className='boardList'>{tables.length ? tables.map(table => { return table.render() }) : "No Boards"} </ul>
                </div>

                <PopupTable onClose={() => setShowPopup(false)} show={showPopup} userid={user.uid}/>
            </div>
        );
    }
}

export default Boards;