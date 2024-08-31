import { useState, useEffect } from "react";
import { getPlayersList } from "../../api";
import { LeaderBoardPlayer } from "../../components/LeaderBoardPlayer/LeaderBoardPlayer";
import styles from "./LeaderBoardPage.module.css";
import { useNavigate } from "react-router-dom";

export function LeaderBoardPage() {
  const [leaderArray, setLeaderArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      <div className={styles.leader_board_container}>
        <div className={styles.leader_board_container_top}>
          <h1 className={styles.leader_board_container_h1}>Лидерборд</h1>
          <button className={styles.leader_board_container_button} onClick={startGame}>
            Начать игру
          </button>
        </div>
        <div className={styles.leader_board_container_middle}>
          <div className={styles.leader_board_container_middle_div1}>Позиция</div>
          <div className={styles.leader_board_container_middle_div2}>Пользователь</div>
          <div className={styles.leader_board_container_middle_div3}>Время </div>
        </div>
        {leaderArray.map((player, index) => (
          <LeaderBoardPlayer
            key={player.id}
            name={player.name}
            time={`${Math.floor(player.time / 60)}:${(player.time % 60).toString().padStart(2, "0")}`} // Форматируем время
            position={index + 1}
          />
        ))}
      </div>
    </>
  );
}
