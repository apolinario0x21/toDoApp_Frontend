import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form, ListGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/tasks";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    /* useEffect que permite executar efeitos colaterais em componentes */
    useEffect(() => {
        fetchTasks();
    }, []) /*[], executa apenas uma vez quando o componente é montado*/

    const fetchTasks = () => {
        setLoading(true);

        setTimeout(() => {

            axios.get(API_URL)
                .then(response => setTasks(response.data))
                .catch(error => console.error("Erro ao buscar tarefas: ", error))
                .finally(() => setLoading(false));
            // executa sempre, independente do sucesso ou falha da requisição

        }, 0)
    }
    const addTask = () => {
        if (newTask.trim() === "") return;

        axios.post(API_URL, {title: newTask, completed: false})
            .then(() => {
                setNewTask("");
                fetchTasks();
            })
            .catch(error => {
                if (error.response && error.response.data) {

                    const data = error.response.data;
                    const message = typeof data === 'string'
                        ? data
                        : Object.values(data).join(", ");
                    setErrorMessage(message);
                } else {
                    setErrorMessage("Erro inesperado ao adicionar tarefa.");
                }
                console.error("Erro ao adicionar tarefa: ", error);
            });
    }

    const deleteTask = (id) => {
        axios.delete(`${API_URL}/${id}`).then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        }).catch(error => console.error("Erro ao deletar tarefa: ", error));
    }


    const toggleTaskStatus = (id, currentStatus) => {
        axios.patch(`${API_URL}`, {id: id, completed: !currentStatus})
            .then(() => fetchTasks())
            .catch(error => console.error("Erro ao atualizar tarefa: ", error));
    }

    const handleEditTitle = async (task) => {

        const newTitle = prompt("Novo título:", task.title);
        if (newTitle && newTitle.trim() !== "") {
            try {
                await axios.put(`${API_URL}/${task.id}`, {title: newTitle});
                fetchTasks();
            } catch (error) {
                console.error("Erro ao editar título da tarefa:", error);
            }
        }


    };


    return (
        <Container className={"mt-5"}>


            <h2 className={"mb-4"}>Lista de Tarefas</h2>

            <Form className="d-flex flex-column mb-3">
                <Form.Control className={"mb-2"}
                              type="text"
                              placeholder="Nova tarefa"
                              value={newTask}
                              onChange={(e) => {
                                  setNewTask(e.target.value);
                                  setErrorMessage("");
                              }}
                />

                {errorMessage && (
                    <div className="text-danger mt-2">{errorMessage}</div>
                )}

                <Button variant="primary" onClick={addTask} className={""}>Adicionar</Button>

            </Form>

            {loading ? (
                <div className={"text-center-my-4"}>
                    <Spinner animation={"border"} role={"status"}/>
                    <div className={"mt-2"}>Carregando tarefas...</div>

                </div>
            ) : (
                <ListGroup className={""}>
                    {tasks.map(task => (
                        <ListGroup.Item key={task.id} className={"rounded shadow-sm p-3 mb-2 bg-light text-dark"}>
                            <div className={"d-flex flex-column"}>

                                <span className={"mb-1 small text-muted"}>UUID: <code>{task.id}</code></span>

                                <span className={"mb-1 text-muted small"}>
                                Criada em: {
                                    new Date(task.createdAt).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })
                                }
                            </span>

                                <span className={"fw-bolder text-capitalize mb-1"}>{task.title}</span>
                                <span
                                    className={"small mb-2"}>Status: {task.completed ? "Concluída" : "Pendente"}</span>
                                <div>

                                    <Button
                                        variant={task.completed ? "secondary" : "success"}
                                        className="me-2"
                                        onClick={() => toggleTaskStatus(task.id, task.completed)}
                                    >
                                        {task.completed ? "Marcar como Pendente" : "Marcar como Concluída"}
                                    </Button>

                                    <Button
                                        variant="danger" size={"sim"}
                                        onClick={() => deleteTask(task.id)}>Deletar
                                    </Button>
                                    <button
                                        onClick={() => handleEditTitle(task)}
                                        className="btn btn-warning m-2"
                                    >
                                        Editar Título
                                    </button>

                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    )
}

export default TaskList;