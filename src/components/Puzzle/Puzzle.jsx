import styles from "./Puzzle.module.css";

export function Puzzle() {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p className={styles.popupText}>Игра пройдена без супер-сил</p>
      </div>
    </div>
  );
}
