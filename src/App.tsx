import { Task, TaskType } from "./components/Task";
import styles from "./App.module.css"
import { PlusCircle } from "phosphor-react";
import { FormEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid"
import { EmptyPage } from "./components/EmptyPage";

export function App() {

  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState("");

  const handleDeleteTask = (taskToDelete: TaskType) => {
    const updateTaskList = taskList.filter(task => {
      return task !== taskToDelete;
    });

    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTaskList(updateTaskList);
  }

  const handleTaskStatusChange = (updatedTask: TaskType) => {
    const updateTaskList = taskList.map(task => {
      if (task.id === updatedTask.id) {
        return {
          ...task,
          isChecked: !task.isChecked
        }
      }
      return task;
    });

    setTaskList(updateTaskList);
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    if (newTask.trim() !== "") {
      const newTaskItem: TaskType = {
        id: uuidv4(),
        content: newTask,
        isChecked: false,
      };
      setTaskList([...taskList, newTaskItem]);
      setNewTask("");
    }
  }

  return (
    <>
      <header>
        <h1>To<span>Do</span></h1>
      </header>

      <div className={styles.content}>
        <form onSubmit={handleCreateTask} className={styles.todoForm}>
          <input
            name="todo"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          >
          </input>

          <button type="submit">Criar <PlusCircle size={16} /></button>
        </form>

        <div className={styles.taskStatus}>
          <div className={styles.createdTasks}>
            Tarefas criadas <span>{taskList.length}</span>
          </div>
          <div className={styles.finishedTasks}>
            Concluídas <span>{taskList.filter(task => task.isChecked).length} de {taskList.length}</span>
          </div>
        </div>

        {taskList.length === 0 ? (
          <EmptyPage />
        ) : (
          taskList.map(task => (
            <Task
              key={task.id}
              task={task}
              onDeleteTask={handleDeleteTask}
              onTaskStatusChange={handleTaskStatusChange}
            />
          ))
        )}

      </div>

    </>
  )
}
