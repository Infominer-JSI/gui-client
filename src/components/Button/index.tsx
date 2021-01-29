// import interfaces
import { IButton } from "Interfaces";
// import modules
import classnames from "classnames";
// import styles and images
import styles from "./styles.module.scss";

export default function Button(props: IButton) {
  // get dataset information and set their state
  const { className, onClick, type = "default", children } = props;
  // assign the button style
  const buttonStyle = classnames(styles.default, className, {
    [styles.edit]: type === "edit",
    [styles.delete]: type === "delete",
    [styles.primary]: type === "primary",
  });

  console.log(children);
  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}
