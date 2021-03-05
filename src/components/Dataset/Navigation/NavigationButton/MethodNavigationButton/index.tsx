// import interfaces
import { IButtonNavigationMethod } from "Interfaces";
// import modules
import Button from "components/Inputs/Button";
import { formatMethodType } from "utils/format";
// import styles and images
import styles from "./styles.module.scss";

export default function NavigationButtonMethod(props: IButtonNavigationMethod) {
  // get dataset information and set their state
  const { className, onClick, selected } = props;
  const label = formatMethodType(selected.method);
  return (
    <Button className={className} onClick={onClick}>
      <span className={styles.label}>{label}</span> <br />
      <span className={styles.status}>{selected.status}</span>
    </Button>
  );
}
