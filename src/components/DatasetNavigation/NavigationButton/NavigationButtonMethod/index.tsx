// import interfaces
import { INavigationButtonMethod, EMethodTypes } from "Interfaces";
// import modules
import Button from "components/Button";
// import styles and images
import styles from "./styles.module.scss";

export default function NavigationButtonMethod(props: INavigationButtonMethod) {
  // get dataset information and set their state
  const { onClick, data } = props;

  let label = "";
  switch (data.method) {
    case EMethodTypes.AGGREGATES:
      label = "Subset Aggregates";
      break;
    case EMethodTypes.ACTIVE_LEARNING:
      label = "Active Learning";
      break;
    case EMethodTypes.KMEANS_CLUSTERING:
      label = "KMeans Clustering";
  }

  return (
    <Button className={styles.button} onClick={onClick}>
      <span className={styles.label}>{label}</span> <br />
      <span className={styles.status}>{data.status}</span>
    </Button>
  );
}
