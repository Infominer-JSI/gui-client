// import modules
import { formatMethodType } from "utils/format";
import Button from "components/Inputs/Button";

// import styles and images
import styles from "./styles.module.scss";

// import global state
import { getMethod } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

import { IMethod, IComponentMethod } from "Interfaces";

//===============================================
// Define the component
//===============================================

export default function MethodHeader(props: IComponentMethod) {
  const { store, methodId } = props;

  // get dataset and subset metadata
  const { method } = getMethod(store, methodId) as IMethod;
  // format the number of documents
  const label = formatMethodType(method);
  return (
    <div className={styles.container}>
      <div className={styles.controllers}>
        <h1>{label}</h1>
        <div className={styles.buttons}>
          <Button
            type="full"
            size="medium"
            color="red"
            icon="delete"
            intensity="dark"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className={styles.information}>
        <div className={styles.metadata}>
          <div></div>
        </div>
      </div>
    </div>
  );
}
