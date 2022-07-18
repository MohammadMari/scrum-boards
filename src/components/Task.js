import React, { Component } from 'react';
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
            <div className='taskInfo'>
                {this.name}
            </div>
         )
    };

};


class Tasks extends Component {
    state = {
        todoTask: [new Task('woa','weee','10/10/22'),new Task('woooooo','weee','10/10/22') ],
        wipTask: [],
        doneTask: [ ]
    };

    constructor() {
        super();
        this.createTask = this.createTask.bind(this);
    }

     createTask = () => {
        this.setState({todoTask: this.state.todoTask.concat(new Task('wa','wa','wa'))});
    };


    render() {
        return ( 
        <div>
            <button onClick={this.createTask}> hi</button>
            <div className='taskParent'>
                <div className='taskBox'>
                    <div className='taskHeader'>
                        TODO
                    </div>
                    <ul>{this.state.todoTask.map(task => <li className='list'> {task.render()}</li>)} </ul>
                </div>

                <div className='taskBox'> 
                    <div className='taskHeader'>
                        WIP
                    </div>
                    <ul>{this.state.wipTask.map(task => <li key={task}> {task.name}</li>)} </ul>
                </div>

                <div className='taskBox'> 
                    <div className='taskHeader'>
                        DONE
                    </div>

                    <ul>{this.state.doneTask.map(task => <li key={task}> {task}</li>)} </ul>
                </div>
            </div>
        </div>

        );
       
    };
}

export default Tasks;