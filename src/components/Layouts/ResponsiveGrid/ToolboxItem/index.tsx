import React from "react";
import Button from "components/Inputs/Button";

import styles from "./styles.module.scss";

export default function ToolboxItem(props: any) {
  const { item, onAddItem } = props;
  return (
    <Button
      className={styles.toolboxItem}
      onClick={onAddItem.bind(undefined, item[0])}
      type="outline"
      size="small"
      color="gray"
      intensity="dark"
      text={item[1]}
    ></Button>
  );
}
