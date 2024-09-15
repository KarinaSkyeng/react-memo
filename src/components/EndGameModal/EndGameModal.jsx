import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateLeaderboard } from "../../api";

export function EndGameModal({
  isWon,
  level,
  isHardMode,
  gameDurationSeconds,
  gameDurationMinutes,
  onClick,
  achievements,
  hasUsedSuperPower,
}) {
  const title = isWon && level <= 2 ? "Вы победили!" : "";
  const isLeader = isWon && isHardMode && level === 3;
  const lossTitle = !isWon ? "Вы проиграли!" : "";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emodji" : "dead emodji";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleGameEnd = async () => {
    const totalTime = gameDurationMinutes * 60 + gameDurationSeconds;
    const cardAchievements = [...achievements];

    if (isWon && isHardMode && !cardAchievements.includes(1)) {
      console.log(achievements);
      cardAchievements.push(1); // Ачивка за сложный уровень
    }

    if (isWon && !hasUsedSuperPower && !cardAchievements.includes(2)) {
      cardAchievements.push(2); // Ачивка за победу без суперсил
    }

    if (username.trim()) {
      try {
        await updateLeaderboard(username, totalTime, cardAchievements);
        console.log("Результаты игры успешно отправлены");
        navigate("/leaderboard");
      } catch (error) {
        console.error("Ошибка при отправке результатов игры:", error);
        alert("Не удалось обновить лидерборд, попробуйте снова.");
      }
    } else {
      alert("Введите имя пользователя перед отправкой!");
    }
  };

  const handleInputChange = event => {
    setUsername(event.target.value);
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      {title && <h2 className={styles.title}>{title}</h2>}
      {lossTitle && <h2 className={styles.title}>{lossTitle}</h2>}
      {isLeader && (
        <div className={styles.modalContainer}>
          <h3 className={styles.leaderboardModal}>Вы попали на Лидерборд!</h3>
          <input
            className={styles.input}
            type="text"
            placeholder="Пользователь"
            value={username}
            onChange={handleInputChange}
          />
          <button className={styles.submitButton} type="button" onClick={handleGameEnd}>
            Отправить
          </button>
        </div>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}:{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>

      <Link className={styles.LeaderBoardLink} to="/leaderboard">
        Перейти к лидерборду
      </Link>
    </div>
  );
}
