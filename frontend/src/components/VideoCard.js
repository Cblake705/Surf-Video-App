import React from "react";
import styles from "./Home.module.css";

const VideoCard = ({ title, description, url, thumbnailUrl }) => {
  return (
    <div className={styles.videoCard}>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <video width="320" height="240" controls>
          <source src={url} type="video/mp4" />
          Your Browser does not support the video tag.
        </video>
      )}
      <h3 className={styles.videoCardTitle}>{title}</h3>
      <p className={styles.videoCardDescription}>{description}</p>
    </div>
  );
};
export default VideoCard;
