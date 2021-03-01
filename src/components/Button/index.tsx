// import interfaces
import { IButton } from "Interfaces";
// import modules
import cn from "classnames";
// import styles and images
import styles from "./styles.module.scss";

export default function Button(props: IButton) {
  // get dataset information and set their state
  const { className, onClick, type = "default", children } = props;
  // assign the button style
  const buttonStyle = cn(styles.default, className, {
    [styles.primary]: type === "primary",
    [styles.delete]: type === "delete",
    [styles.edit]: type === "edit",
    [styles.primaryDark]: type === "primary-dark",
    [styles.deleteDark]: type === "delete-dark",
    [styles.editDark]: type === "edit-dark",
  });
  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}
