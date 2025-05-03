import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteTaskModal = ({ show, onHide, task, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {task && (
                    <div>
                        <p>Tem certeza que deseja excluir a tarefa:</p>
                        <p className="fw-bold">{task.title}</p>
                        <p className="text-danger fw-bold">Esta ação não pode ser desfeita.</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Excluir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteTaskModal;