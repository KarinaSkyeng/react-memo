import { useState } from "react";
import styles from "./LeaderBoardPlayer.module.css";
import { Puzzle } from "../Puzzle/Puzzle";
import { Ball } from "../Ball/Ball";

export function LeaderBoardPlayer({ position, name, achievements = [], time }) {
  const [isBallVisible, setIsBallVisible] = useState(false);
  const [isPuzzleVisible, setIsPuzzleVisible] = useState(false);

  const handlePuzzleMouseEnter = () => {
    setIsPuzzleVisible(true);
  };
  const handlePuzzleMouseLeave = () => {
    setIsPuzzleVisible(false);
  };
  const handleBallMouseEnter = () => {
    setIsBallVisible(true);
  };
  const handleBallMouseLeave = () => {
    setIsBallVisible(false);
  };

  const hasPuzzle = achievements.includes(1);
  const hasBall = achievements.includes(2);

  console.log("Achievements for player", name, achievements);

  return (
    <div className={styles.leaderboardPlayerSection}>
      <div className={styles.leaderboardPlayerPosition}>{position}</div>
      <div className={styles.leaderboardPlayerUser}>{name}</div>
      <div className={styles.leaderboardPlayerIcons}>
        <img
          src={hasPuzzle ? "./puzzle.svg" : "./puzzle_empty.svg"}
          alt="puzzle"
          onMouseEnter={handlePuzzleMouseEnter}
          onMouseLeave={handlePuzzleMouseLeave}
        />
        <img
          src={hasBall ? "./magic_ball.svg" : "./magic_ball_empty.svg"}
          alt="ball"
          onMouseEnter={handleBallMouseEnter}
          onMouseLeave={handleBallMouseLeave}
        />
        {isPuzzleVisible && <Puzzle />}
        {isBallVisible && <Ball />}
      </div>
      <div className={styles.leaderboardPlayerTime}>{time}</div>
    </div>
  );
}
