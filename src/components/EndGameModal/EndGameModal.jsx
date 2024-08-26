import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link } from "react-router-dom";

export function EndGameModal({ isWon, level, isHardMode, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const title = isWon && level <= 2 ? "Вы победили!" : "";
  const isLeader = isWon && isHardMode && level === 3;
  const lossTitle = !isWon ? "Вы проиграли!" : "";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      {title && <h2 className={styles.title}>{title}</h2>}
      {lossTitle && <h2 className={styles.title}>{lossTitle}</h2>}
      {isLeader && (
        <div className={styles.modalContainer}>
          <h3 className={styles.leaderboardModal}>Вы попали на Лидерборд!</h3>
          <input className={styles.input} type="text" placeholder="Пользователь" />
          {/* <button className={styles.submitButton} type="button">
            Отправить
          </button> */}
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
