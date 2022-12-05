import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTaskPopup';
import Card from './Card.js';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        if(localStorage.getItem("taskList") != undefined) {

        let arr = localStorage.getItem("taskList")

            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const toggle = () => {
        setModal(!modal);
    }

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem('taskList', JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem('taskList', JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const saveTask = (taskObj) => {
        console.log(taskObj)
        let tempList = taskList
        tempList.push(taskObj)
        setTaskList(tempList)
        setModal(false)
        console.log("taskList", (typeImplementation))
        localStorage.setItem("taskList", JSON.stringify(taskList))
    }

    return (
       <>
         <div className="header text-center">
            <h3>Todo List</h3>
            <button className="btn btn-primary mt-2" onClick = {() => setModal(true)}>Create Task</button>
        </div>

        <div className='task-container'>
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}

        </div>
        <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
       </>
    );
};

export default TodoList;