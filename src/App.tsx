import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "CSS&HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all")

    //task delete function
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }
    //task add function
    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter( t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter( t => !t.isDone)
    }

    return (
        <div className="App">
            {/*props for Todolist component*/}
            <Todolist
                title="what to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}/>
        </div>
    );
}

export default App;
