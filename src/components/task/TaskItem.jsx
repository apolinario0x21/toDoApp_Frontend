import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { formatDate } from "../../utils/dateFormatter";

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
    return (
        <ListGroup.Item
            className="
            text-center
            rounded shadow-sm p-3 mb-2 bg-light text-dark"
            style={{
                width: "450px",
                // height: "200px",
                overflow: "auto"
            }}
        >
            <div className="d-flex flex-column">
        <span className="mb-1 small text-muted">
         {/* UUID: <code>{task.id}</code> */}
        </span>
                <span className="mb-1 text-muted small">
          Criada em: {formatDate(task.createdAt)}
        </span>
                <span className="fw-bolder text-capitalize mb-1">{task.title}</span>
                <span className="small mb-2">
          Status: {task.completed ? "Concluída" : "Pendente"}
        </span>
                <div>
                    <Button
                        variant={task.completed ? "secondary" : "success"}
                        className="me-2"
                        size="sm"
                        onClick={() => onToggleStatus(task.id, task.completed)}
                    >
                        {task.completed ? "Marcar como Pendente" : "Marcar como Concluída"}
                    </Button>

                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(task)}
                    >
                        Deletar
                    </Button>

                    <Button
                        variant="warning"
                        size="sm"
                        className="m-2"
                        onClick={() => onEdit(task)}
                    >
                        Editar Título
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default TaskItem;