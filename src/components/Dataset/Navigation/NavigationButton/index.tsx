// import interfaces
import { IMethod, IButtonNavigation, ISubset } from "Interfaces";
// import modules and components
import SubsetNavigationButton from "./SubsetNavigationButton";
import MethodNavigationButton from "./MethodNavigationButton";
// import styles
import styles from "./styles.module.scss";

export default function NavigationButton(props: IButtonNavigation) {
  const { onClick, selected } = props;

  return props.selected.type === "subset" ? (
    <SubsetNavigationButton
      className={styles.button}
      onClick={onClick}
      selected={selected as ISubset}
    />
  ) : (
    <MethodNavigationButton
      className={styles.button}
      onClick={onClick}
      selected={selected as IMethod}
    />
  );
}
