import './Main.css';

function Main () {
    return (
        <div>
            <div className='SideBar'>
                <button className='SideBarButton'> Boards </button>
                <button className='SideBarButton'> Tasks </button>
            </div>

            <div className='taskBox'>
                TODO
            </div>

            <div className='taskBox'> 
                WIP
            </div>

            <div className='taskBox'> 
                DONE
            </div>
        </div>
    );
}

export default Main;