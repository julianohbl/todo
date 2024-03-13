import { CheckCircle, Circle, Trash } from "phosphor-react"
import styles from "./Task.module.css"
import { useState } from "react"

export interface TaskType {
  id: string;
  content: string;
  isChecked: boolean;
}

interface TaskProps {
  task: TaskType;
  onDeleteTask: (task: TaskType) => void;
  onTaskStatusChange: (updatedTask: TaskType) => void;
}

export function Task({ task, onDeleteTask, onTaskStatusChange }: TaskProps) {
  const [isChecked, setIsChecked] = useState(task.isChecked);

  const handleCheckboxChange = () => {
    const updatedTask = { ...task, isChecked: !isChecked };
    setIsChecked(!isChecked);
    onTaskStatusChange(updatedTask)

  }

  function handleDeleteTask() {
    onDeleteTask(task)
  }

  return (
    <>
      <div className={styles.contentTask}>
        <label className={styles.task}>
          <input className={styles.checkbox}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className={`checkbox-label ${isChecked ? styles.checkedIcon : styles.uncheckedIcon}`}>
            {isChecked ? <CheckCircle size={24} weight="fill" /> : <Circle size={24} />}
          </span>

          <span className={styles.content}>
            {task.content}
          </span>

          <button onClick={handleDeleteTask} title="Deletar task">
            <Trash size={24} />
          </button>
        </label>
      </div>
    </>
  )
}