// src/components/Navbar.js
import React from "react";
import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <a
          href="https://www.instagram.com/christian.a.blake/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/@BigBl4nk"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          <FaYoutube />
        </a>
        <a
          href="https://github.com/Cblake705"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          <FaGithub />
        </a>
      </div>
      <div className={styles.centerSection}>
        <div className={styles.titleWrapper}>
          <img src="wave.png" alt="Title Image" className={styles.titleImage} />
          <h1 className={styles.navTitle}>CHRISTIAN BLAKE</h1>
          <h1 className={styles.navTitle}></h1>
        </div>
      </div>
      <div className={styles.rightSection}>
        <Link to="/login" className={styles.navLinkText}>
          Login
        </Link>
        <a
          href="https://play2048.co/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLinkText}
        >
          2048
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
