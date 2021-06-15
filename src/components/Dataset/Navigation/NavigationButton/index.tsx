// import modules and components
import NavigationButtonSubset from "./NavigationButtonSubset";
import NavigationButtonMethod from "./NavigationButtonMethod";
// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the helper components
//===============================================

import { IMethod, ISubset } from "Interfaces";

export interface INavigationButton {
  onClick?: any;
  selected: ISubset | IMethod;
}

//===============================================
// Define the component
//===============================================

export default function NavigationButton(props: INavigationButton) {
  const { onClick, selected } = props;

  return props.selected.type === "subset" ? (
    <NavigationButtonSubset
      className={styles.button}
      onClick={onClick}
      selected={selected as ISubset}
    />
  ) : (
    <NavigationButtonMethod
      className={styles.button}
      onClick={onClick}
      selected={selected as IMethod}
    />
  );
}
