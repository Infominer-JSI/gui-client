// import interfaces
import { IDropdownList } from "Interfaces";

// import modules
import React from "react";
import cn from "classnames";

// import styles and images
import styles from "./styles.module.scss";

export default function List(props: IDropdownList) {
  // get dataset information and set their state
  const {
    hidden,
    selectedId,
    options,
    toggle = () => {},
    onClick = () => {},
  } = props;
  // assign the button style
  const dropdownStyle = cn(styles.container, {
    [styles.hide]: hidden === true,
  });

  function optionClick(id: number) {
    return function () {
      toggle();
      onClick(id);
    };
  }

  return (
    <div className={dropdownStyle}>
      <div className={styles.triangle}></div>
      <div className={styles.content}>
        <div className={styles.inner}>
          {options.map((option, id) => {
            const optionStyle = cn(styles.option, {
              [styles.selected]: id === selectedId,
            });
            return (
              <div key={id} onClick={optionClick(id)} className={optionStyle}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
