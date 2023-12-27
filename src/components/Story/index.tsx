import React from "react";
import closeIcon from "../../assets/close.svg";
import messageIcon from "../../assets/message.svg";
import { getDateTime } from "../../utils/getDateTime";

import styles from "./story.module.scss";

interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

interface StoryProps {
  index: number;
  story: Story;
}

const Story: React.FC<StoryProps> = ({ index, story }) => {
  let { by, descendants, title, score, time, type, url } = story;

  return (
    <div className={styles.story}>
      <div className={styles.number}>{index + 100}.</div>
      <div className={styles.points}>
        <p>{score}</p>
        <p>points</p>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <a href={url}>{title}</a>
        </div>
        <div className={styles.description}>
          <p>by {by}</p>
          <p>
            <a>{new URL(url).hostname}</a>
          </p>
          <p>{getDateTime(time)}</p>
          <p className={styles.message}>
            <img src={messageIcon} alt="" /> {descendants}
          </p>
        </div>
      </div>
      <button className={styles.hideButton}>
        <img src={closeIcon} alt="hide story button" />
      </button>
    </div>
  );
};

export default Story;
