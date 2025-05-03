import React, { useState } from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";
import EditTaskModal from "../components/task/EditTaskModal";
import DeleteTaskModal from "../components/task/DeleteTaskModal";
import useTasks from "../hooks/useTasks";

const TasksPage = () => {
    const {
        tasks,
        loading,
        addTask,
        toggleTaskStatus,
        editTaskTitle,
        removeTask,
        validateTaskTitle
    } = useTasks();

    // Estado para modal de edição
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Estado para modal de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Funções para lidar com a edição de tarefas
    const handleOpenEditModal = (task) => {
        setTaskToEdit(task);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setTaskToEdit(null);
    };

    const handleSaveEdit = async (id, title) => {
        const result = await editTaskTitle(id, title);
        if (result.success) {
            handleCloseEditModal();
        }
        return result;
    };

    // Funções para lidar com a exclusão de tarefas
    const handleOpenDeleteModal = (task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (taskToDelete) {
            const success = await removeTask(taskToDelete.id);
            if (success) {
                handleCloseDeleteModal();
            }
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">To Do List</h2>

            <TaskForm onAddTask={addTask} />

            <TaskList
                tasks={tasks}
                loading={loading}
                onToggleStatus={toggleTaskStatus}
                onEditTask={handleOpenEditModal}
                onDeleteTask={handleOpenDeleteModal}
            />

            {/* Modais */}
            <EditTaskModal
                show={showEditModal}
                onHide={handleCloseEditModal}
                task={taskToEdit}
                onSave={handleSaveEdit}
                validateTitle={validateTaskTitle}
            />

            <DeleteTaskModal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                task={taskToDelete}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
};

export default TasksPage;