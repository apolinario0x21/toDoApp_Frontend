import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form, ListGroup} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/tasks";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    /*quando for renderizado o componente, faz uma requisição para a API*/
    useEffect(() => {
        axios
            .get(API_URL)
            .then(response => setTasks(response.data))
            .catch(error => console.error("Erro ao buscar tarefas: ", error));
    }, []) /*[], executa apenas uma vez quando o componente é montado*/

    const addTask = () => {
        if (newTask.trim() === "") return;

        axios.post(API_URL, {title: newTask, completed: false})
            .then(response => {
            setTasks([...tasks, response.data]);
            setNewTask("");
        }).catch(error => console.error("Erro ao adicionar tarefa: ", error));
    }

    const deleteTask = (id) => {
        axios.delete(`${API_URL}/${id}`).then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        }).catch(error => console.error("Erro ao deletar tarefa: ", error));
    }

    return (
        <Container className={"mt-5"}>
            <h2 className={"mt-0"}>Lista de Tarefas</h2>

            <Form className="d-flex mb-3">
                <Form.Control
                    type="text"
                    placeholder="Nova tarefa"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />

                <Button variant="primary" onClick={addTask} className={"ms-2"}>Adicionar</Button>
            </Form>

            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item key={task.id} className={"d-flex justify-content-between align-items-center"}>
                        <div className={"bg-white"}>
                            <span className={"fw-bold"}>{task.title}</span>
                            <p className={"mb-0 small"}>{task.completed ? "Concluída" : "Pendente"}</p>
                            <Button variant="danger" onClick={() => deleteTask(task.id)}>Deletar</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>


        </Container>
    )

}

export default TaskList;