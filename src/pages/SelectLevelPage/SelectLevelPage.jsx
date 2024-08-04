import { useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useContext, useState } from "react";
import { EasyContext } from "../../context/context";
import { Link } from "react-router-dom";

export function SelectLevelPage() {
  const { isEasyMode, setEasyMode } = useContext(EasyContext);
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [checked, setChecked] = useState(isEasyMode);
  const [level, setLevel] = useState({});

  const startGame = () => {
    if (selectedLevel !== null) {
      navigate(`/game/${selectedLevel}`);
    } else {
      alert("Пожалуйста, выберите уровень сложности");
    }
  };

  const handleInputChangeCheckbox = e => {
    const { name } = e.target;
    setChecked(!checked);
    setLevel({
      ...level,
      [name]: !checked,
    });
    setEasyMode(!checked);
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
            name="easyMode"
            checked={checked}
            onChange={handleInputChangeCheckbox}
            className={styles.easyModeCheckbox}
          />
          <label htmlFor="easyModeCheckbox" className={styles.easyModeLabel}></label>
          <span>Легкий режим (3 жизни)</span>
        </div>
        <button className={styles.startButton} onClick={startGame}>
          Играть
        </button>
        <Link className={styles.LeaderBoardLink} to="/game/leaderboard">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
