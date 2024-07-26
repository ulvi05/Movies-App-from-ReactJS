import React from "react";
import styles from "./index.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = ({ active }) => {
  return (
    <div className={`${styles.sidebar} ${active && styles.active}`}>
      <ul className={styles["sidebar-ul"]}>
        <li>
          <Link className={styles["sidebar-link"]} to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link className={styles["sidebar-link"]} to={"/movies"}>
            Movies
          </Link>
        </li>
        <li>
          <Link className={styles["sidebar-link"]} to={"/add-movies"}>
            Add Movies
          </Link>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  active: PropTypes.bool,
};

export default Sidebar;
