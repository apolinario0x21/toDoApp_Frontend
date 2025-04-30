import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from "./components/TaskList.jsx";
import NotFound from "./pages/NotFound.jsx";
import {Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/api/tasks" element={<TaskList/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}
