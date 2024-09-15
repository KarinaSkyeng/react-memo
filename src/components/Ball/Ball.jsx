import styles from "./Ball.module.css";

export function Ball() {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p className={styles.popupText}>Игра пройдена в сложном режиме</p>
      </div>
    </div>
  );
}
