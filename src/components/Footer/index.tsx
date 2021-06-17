// styles and icons
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

//===============================================
// Define the component
//===============================================

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          <FontAwesomeIcon icon={faCopyright} /> 2018 AILAB JSI. All Rights
          Reserved.
        </div>
        <div className={styles.links}>
          <a className={styles.link} href="https://github.com/Infominer-JSI/">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </footer>
  );
}
