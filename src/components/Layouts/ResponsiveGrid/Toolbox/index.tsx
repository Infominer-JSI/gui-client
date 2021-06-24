import React from "react";

import ToolboxItem from "../ToolboxItem";

import styles from "./styles.module.scss";

export default function Toolbox(props: any) {
  const { items, onAddItem } = props;

  return (
    <div className={styles.toolbox}>
      <div className={styles.label}>Hidden Graphs</div>
      <div className={styles.items}>
        {items.map((item: any) => (
          <ToolboxItem key={item[0].i} item={item} onAddItem={onAddItem} />
        ))}
      </div>
    </div>
  );
}
