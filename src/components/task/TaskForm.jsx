import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TaskForm = ({ onAddTask }) => {
    const [newTask, setNewTask] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTask.trim() === "") return;

        const result = await onAddTask(newTask);

        if (result.success) {
            setNewTask("");
            setErrorMessage("");
        } else {
            setErrorMessage(result.message);
        }
    };

    return (
        <Form className="d-flex flex-column mb-3" onSubmit={handleSubmit}>
            {errorMessage && (
                <div className="text-danger mt-2 mb-2">{errorMessage}</div>
            )}

            <Form.Control
                className="mb-2"
                type="text"
                placeholder="Nova tarefa"
                value={newTask}
                onChange={(e) => {
                    setNewTask(e.target.value);
                    setErrorMessage("");
                }}
            />

            <Button variant="primary" type="submit">
                Adicionar
            </Button>
        </Form>
    );
};

export default TaskForm;