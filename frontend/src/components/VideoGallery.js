import React, { useState } from "react";
import VideoCard from "./VideoCard";
import styles from "./Home.module.css";

const VideoGallery = () => {
  //static sample data for development
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Cool Turn",
      description: "Turn from 3/29/25",
      url: "/videos/MVI_1710 copy.MP4",
      thumbnailUrl: "",
    },
    {
      id: 2,
      title: "Cool Turn",
      description: "Turn from 3/29/25",
      url: "/videos/MVI_1710 copy.MP4",
      thumbnailUrl: "",
    },
  ]);
  return (
    <div className={styles.videoGallery}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          description={video.description}
          url={video.url}
          thumbnailUrl={video.thumbnailUrl}
        />
      ))}
    </div>
  );
};

export default VideoGallery;
