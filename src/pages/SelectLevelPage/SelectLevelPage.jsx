import { useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useContext, useState } from "react";
import { EasyContext } from "../../context/context";

export function SelectLevelPage() {
  const { isEasyMode, setEasyMode } = useContext(EasyContext);
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const startGame = () => {
    if (selectedLevel !== null) {
      navigate(`/game/${selectedLevel}`);
    } else {
      alert("Пожалуйста, выберите уровень сложности");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          {[3, 6, 9].map(level => (
            <li
              key={level}
              className={`${styles.level} ${selectedLevel === level ? styles.selected : ""}`}
              onClick={() => setSelectedLevel(level)}
            >
              {level / 3}
            </li>
          ))}
        </ul>
        <div className={styles.labelName}>
          <input
            type="checkbox"
            id="easyModeCheckbox"
            checked={isEasyMode}
            onChange={e => setEasyMode(e.target.checked)}
            className={styles.easyModeCheckbox}
          />
          <label htmlFor="easyModeCheckbox" className={styles.easyModeLabel}></label>
          <span>Легкий режим (3 жизни)</span>
        </div>
        <button className={styles.startButton} onClick={startGame}>
          Играть
        </button>
      </div>
    </div>
  );
}
