// import interfaces
import { IButton } from "Interfaces";
// import modules
import cn from "classnames";
// import styles and images
import styles from "./styles.module.scss";

export default function NavigationDropdown(props: IButton) {
  // get dataset information and set their state
  const { hidden, onClick, children } = props;
  // assign the button style
  const dropdownStyle = cn(styles.container, {
    [styles.hide]: hidden === true,
  });
  return (
    <div className={dropdownStyle}>
      <div className={styles.triangle}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
