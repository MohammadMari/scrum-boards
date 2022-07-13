import './Main.css';
import React, { useState } from 'react';


class Task extends React.Component {
   
}



function Main () {
    return (
        <div>
            <div className='SideBar'>
                <button className='SideBarButton'> Boards </button>
                <button className='SideBarButton'> Tasks </button>
            </div>
            <div className='taskParent'>
                <div className='taskBox'>
                    <div className='taskHeader'>
                        TODO
                    </div>
                </div>
                <div className='taskBox'> 
                    <div className='taskHeader'>
                        WIP
                    </div>
                </div>

                <div className='taskBox'> 
                    <div className='taskHeader'>
                        DONE
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;