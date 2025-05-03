import React from "react";
import { ListGroup } from "react-bootstrap";
import TaskItem from "./TaskItem";
import LoadingSpinner from "../ui/LoadingSpinner";

const TaskList = ({
                      tasks,
                      loading,
                      onToggleStatus,
                      onEditTask,
                      onDeleteTask
                  }) => {
    if (loading) {
        return <LoadingSpinner message="Carregando tarefas..." />;
    }

    return (
        <ListGroup>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                />
            ))}
        </ListGroup>
    );
};

export default TaskList;