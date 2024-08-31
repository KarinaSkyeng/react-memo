import styles from "./LeaderBoardPlayer.module.css";

export function LeaderBoardPlayer({ name, time, position }) {
  return (
    <div className={styles.leader_board_container_middle}>
      <div className={styles.leader_board_container_middle_div1_b}>{position}</div>
      <div className={styles.leader_board_container_middle_div2_b}>{name}</div>
      <div className={styles.leader_board_container_middle_div3_b}>{time}</div>
    </div>
  );
}
