import styles from "./index.module.scss";
import Container from "../Container";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import SideBar from "../Sidebar";
import { useWishlist } from "../../services/context/wishlistContext.jsx";
import { useAuth } from "../../services/context/authContext.jsx";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const Header = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const { auth, logout } = useAuth();
  const { wishlist } = useWishlist();
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <h1>MovieMania</h1>
          <ul>
            {auth ? (
              <>
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
                <li>
                  <Link className={styles.link} to={"/wishlist"}>
                    Wishlist <sup>{wishlist.length}</sup>
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure Logout?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#e50914",
                        cancelButtonColor: "#333",
                        confirmButtonText: "Yes, logout!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          logout();
                          Swal.fire({
                            title: "Logged Out!",
                            text: "See you later",
                            icon: "success",
                          });
                        }
                      });
                    }}
                    variant="contained"
                    color="error"
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className={styles.link} to={"/login"}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={"/register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
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
