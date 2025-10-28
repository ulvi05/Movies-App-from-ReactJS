import styles from "./index.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useWishlist } from "../../services/context/wishlistContext.jsx";
import { useAuth } from "../../services/context/authContext.jsx";
import Swal from "sweetalert2";

const Sidebar = ({ active }) => {
  const { wishlist } = useWishlist();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
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
  };

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
        <li>
          <Link className={styles["sidebar-link"]} to={"/wishlist"}>
            Wishlist <sup>{wishlist.length}</sup>
          </Link>
        </li>

        {auth && (
          <li>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}

        {!auth && (
          <>
            <li>
              <Link className={styles["sidebar-link"]} to={"/login"}>
                Login
              </Link>
            </li>
            <li>
              <Link className={styles["sidebar-link"]} to={"/register"}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  active: PropTypes.bool,
};

export default Sidebar;
