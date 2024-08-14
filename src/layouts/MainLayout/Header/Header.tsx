import React from "react";

import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left_wrapper}>
          <Link to="/">FAQ</Link>
        </div>

        <div className={styles.right_wrapper}>
          <Button href="/login">Login</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
