import React from "react";
import Button from "components/Button";

import styles from "./styles.module.scss";

export default function ToolboxItem(props: any) {
  const { item, onAddItem } = props;
  return (
    <Button
      className={styles.toolboxItem}
      onClick={onAddItem.bind(undefined, item[0])}
    >
      {item[1]}
    </Button>
  );
}
