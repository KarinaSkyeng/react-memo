import { useState, useEffect } from "react";
import { getPlayersList } from "../../api";
import { LeaderBoardPlayer } from "../../components/LeaderBoardPlayer/LeaderBoardPlayer";
import styles from "./LeaderBoardPage.module.css";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

export function LeaderBoardPage() {
  const [leaderArray, setLeaderArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getPlayersList();
        const filteredData = data.sort((a, b) => a.time - b.time).slice(0, 10);
        setLeaderArray(filteredData);
      } catch (err) {
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startGame = () => {
    navigate(`/game/9`);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.leaderboardContainer}>
        <div className={styles.leaderboardHeader}>
          <h1 className={styles.leaderboardTitle}>Лидерборд</h1>
          <button className={styles.leaderboardButton} onClick={startGame}>
            Начать игру
          </button>
        </div>
        <div className={styles.leaderboardSection}>
          <div className={cn(styles.leaderboardText, styles.leaderboardPosition)}>Позиция</div>
          <div className={cn(styles.leaderboardText, styles.leaderboardUser)}>Пользователь</div>
          <div className={cn(styles.leaderboardText, styles.leaderboardAchievement)}>Достижения</div>
          <div className={cn(styles.leaderboardText, styles.leaderboardTime)}>Время </div>
        </div>
        {leaderArray.map((player, index) => (
          <LeaderBoardPlayer
            key={player.id}
            name={player.name}
            time={`${Math.floor(player.time / 60)}:${(player.time % 60).toString().padStart(2, "0")}`}
            position={index + 1}
            achievements={player.achievements}
          />
        ))}
      </div>
    </>
  );
}
