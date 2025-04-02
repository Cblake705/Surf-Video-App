// src/components/Home.js
import React from "react";
import VideoGallery from "./VideoGallery";
import Navbar from "./Navbar.js";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Navbar />
      <VideoGallery />
    </div>
  );
};

export default Home;
