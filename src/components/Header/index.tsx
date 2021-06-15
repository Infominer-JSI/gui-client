// import modules
import { Link } from "react-router-dom";
// import styles and images
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Datasets</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
