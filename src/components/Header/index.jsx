import styles from "./index.module.scss";
import Container from "../Container";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import SideBar from "../Sidebar";
const Header = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <h1>MovieMania</h1>
          <ul>
            <li>
              <Link className={styles.link} to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.link} to={"/movies"}>
                Movies
              </Link>
            </li>
            <li>
              <Link className={styles.link} to={"/add-movies"}>
                Add Movies
              </Link>
            </li>
          </ul>
          <button
            onClick={() => setSidebarOpen(!SidebarOpen)}
            className={styles.bar}
          >
            {SidebarOpen ? <IoCloseOutline /> : <HiBars3 />}
          </button>
          <SideBar active={SidebarOpen} />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
