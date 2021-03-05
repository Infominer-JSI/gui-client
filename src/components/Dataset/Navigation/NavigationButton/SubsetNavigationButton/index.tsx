// import interfaces
import { IButtonNavigationSubset } from "Interfaces";
// import modules
import { formatNumber } from "utils/format";
// import styles and images
import styles from "./styles.module.scss";

export default function NavigationButtonSubset(props: IButtonNavigationSubset) {
  // get dataset information and set their state
  const { className, onClick, selected } = props;

  return (
    <button className={className} onClick={onClick}>
      <span className={styles.label}>{selected.label}</span> <br />
      <span className={styles.docs}>
        {formatNumber(selected.nDocuments)} documents
      </span>
    </button>
  );
}
