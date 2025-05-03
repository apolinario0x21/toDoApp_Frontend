import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export const fetchAllTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        throw error;
    }
};

export const createTask = async (title) => {
    try {
        const response = await axios.post(API_URL, { title });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        throw error;
    }
};

export const updateTaskStatus = async (id, completed) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, { completed });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
        throw error;
    }
};

export const updateTaskTitle = async (id, title) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { title });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar título da tarefa:", error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        throw error;
    }
};