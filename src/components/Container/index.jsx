import styles from "./index.module.scss";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Container;
