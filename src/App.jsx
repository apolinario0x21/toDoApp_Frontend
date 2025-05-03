import './App.css'
import TasksPage from "./pages/TasksPage";
import NotFound from "./pages/NotFound.jsx";
import {Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/api/tasks" element={<TasksPage/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}
