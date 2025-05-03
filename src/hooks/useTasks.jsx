import { useState, useEffect } from "react";
import * as taskService from "../services/taskService.jsx";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await taskService.fetchAllTasks();
            setTasks(data);
            setError("");
        } catch (error) {
            setError("Falha ao carregar tarefas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (title) => {
        try {
            await taskService.createTask(title);
            await fetchTasks();
            return { success: true };
        } catch (error) {
            const errorMessage =
                error.response && error.response.data
                    ? typeof error.response.data === 'string'
                        ? error.response.data
                        : Object.values(error.response.data).join(", ")
                    : "Erro inesperado ao adicionar tarefa.";
            return { success: false, message: errorMessage };
        }
    };

    const toggleTaskStatus = async (id, currentStatus) => {
        try {
            await taskService.updateTaskStatus(id, !currentStatus);
            await fetchTasks();
        } catch (error) {
            setError("Erro ao atualizar status da tarefa");
        }
    };

    const editTaskTitle = async (id, title) => {
        try {
            await taskService.updateTaskTitle(id, title);
            await fetchTasks();
            return { success: true };
        } catch (error) {
            const errorMessage =
                error.response && error.response.data
                    ? typeof error.response.data === 'string'
                        ? error.response.data
                        : Object.values(error.response.data).join(", ")
                    : "Erro inesperado ao editar tarefa.";
            return { success: false, message: errorMessage };
        }
    };

    const removeTask = async (id) => {
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
            return true;
        } catch (error) {
            setError("Erro ao deletar tarefa");
            return false;
        }
    };

    const validateTaskTitle = (title) => {
        if (!title || title.trim() === "") {
            return "O título não pode estar em branco";
        }
        if (title.trim().length < 5) {
            return "O título deve ter pelo menos 5 caracteres";
        }
        if (title.trim().length > 32) {
            return "O título não pode ter mais de 32 caracteres";
        }
        return null; // Válido
    };

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        toggleTaskStatus,
        editTaskTitle,
        removeTask,
        validateTaskTitle
    };
};

export default useTasks;