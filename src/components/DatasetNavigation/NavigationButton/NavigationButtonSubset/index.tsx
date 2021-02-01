// import interfaces
import { INavigationButtonSubset } from "Interfaces";
// import modules
import { formatNumber } from "utils/format";
import Button from "components/Button";
// import styles and images
import styles from "./styles.module.scss";

export default function NavigationButtonSubset(props: INavigationButtonSubset) {
  // get dataset information and set their state
  const { onClick, data } = props;

  return (
    <Button className={styles.button} onClick={onClick}>
      <span className={styles.label}>{data.label}</span> <br />
      <span className={styles.docs}>
        {formatNumber(data.nDocuments)} documents
      </span>
    </Button>
  );
}
