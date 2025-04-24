// src/components/Admin.js
import React from "react";
import styles from "./Admin.module.css";
import VideoGallery from "./VideoGallery";
import Navbar from "./Navbar.js";
const Admin = () => {
  return (
    <div className={styles.adminPage}>
      <Navbar />
      <VideoGallery />
    </div>
  );
};

export default Admin;
