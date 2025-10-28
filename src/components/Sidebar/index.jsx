import styles from "./index.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useWishlist } from "../../services/context/wishlistContext.jsx";

const Sidebar = ({ active }) => {
  const { wishlist } = useWishlist();
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
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  active: PropTypes.bool,
};

export default Sidebar;
