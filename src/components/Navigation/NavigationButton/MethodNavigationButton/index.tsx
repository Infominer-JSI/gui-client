// import interfaces
import { IMethodNavigationButton } from "Interfaces";
// import modules
import Button from "components/Button";
import { formatMethod } from "utils/format";
// import styles and images
import styles from "./styles.module.scss";

export default function NavigationButtonMethod(props: IMethodNavigationButton) {
  // get dataset information and set their state
  const { className, onClick, selected } = props;
  const label = formatMethod(selected.method);
  return (
    <Button className={className} onClick={onClick}>
      <span className={styles.label}>{label}</span> <br />
      <span className={styles.status}>{selected.status}</span>
    </Button>
  );
}
