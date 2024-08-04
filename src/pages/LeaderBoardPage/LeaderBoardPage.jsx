import { useState, useEffect } from "react";
import { getPlayersList } from "../../api";
import { LeaderBoardPlayer } from "../../components/LeaderBoardPlayer/LeaderBoardPlayer";
import styles from "./LeaderBoardPage.module.css";

export function LeaderBoardPage() {
  const [leaderArray, setLeaderArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlayersList();
        const filteredData = data.leaders
          .filter(player => player.difficulty === 3) // Учитываем только 3-й уровень сложности
          .sort((a, b) => a.time - b.time); // Сортируем по возрастанию времени
        setLeaderArray(filteredData);
      } catch (err) {
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.leader_board_container}>
        <div className={styles.leader_board_container_top}>
          <h1 className={styles.leader_board_container_h1}>Лидерборд</h1>
          <button className={styles.leader_board_container_button}>Начать игру</button>
        </div>
        <div className={styles.leader_board_container_middle}>
          <div className={styles.leader_board_container_middle_div1}>Позиция</div>
          <div className={styles.leader_board_container_middle_div2}>Пользователь</div>
          <div className={styles.leader_board_container_middle_div3}>Время</div>
        </div>
        {leaderArray.map((player, index) => (
          <LeaderBoardPlayer
            key={player.id}
            id={"#" + player.id}
            name={player.name}
            time={player.time}
            position={index + 1}
          />
        ))}
      </div>
    </>
  );
}
