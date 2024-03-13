import { ClipboardText } from "phosphor-react"
import styles from "./EmptyPage.module.css"

export function EmptyPage() {
  return (
    <div className={styles.empty}>
      <ClipboardText size={56} />
      <h1>Você ainda não tem tarefas cadastradas</h1>
      <a>Crie tarefas e organize seus itens a fazer</a>
    </div>
  )
}