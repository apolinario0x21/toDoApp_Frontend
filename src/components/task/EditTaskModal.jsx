import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditTaskModal = ({
                           show,
                           onHide,
                           task,
                           onSave,
                           validateTitle
                       }) => {
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar título
        const validationError = validateTitle(title);
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        // Salvar
        const result = await onSave(task.id, title);
        if (!result.success) {
            setErrorMessage(result.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Título da Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Novo título:</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setErrorMessage("");
                            }}
                            isInvalid={!!errorMessage}
                        />
                        <Form.Text className="text-muted">
                            O título deve ter entre 5 e 32 caracteres.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {errorMessage}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditTaskModal;