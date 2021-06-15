// import modules
import { formatMethodType } from "utils/format";
// import styles and images
import styles from "./styles.module.scss";

//===============================================
// Define the state interfaces
//===============================================

import { IMethod } from "Interfaces";

interface INavigationButtonMethod {
  className: any;
  onClick?: any;
  selected: IMethod;
}

//===============================================
// Define the component
//===============================================

export default function NavigationButtonMethod(props: INavigationButtonMethod) {
  // get dataset information and set their state
  const { className, onClick, selected } = props;
  const label = formatMethodType(selected.method);
  return (
    <button className={className} onClick={onClick}>
      <span className={styles.label}>{label}</span> <br />
      <span className={styles.status}>{selected.status}</span>
    </button>
  );
}
