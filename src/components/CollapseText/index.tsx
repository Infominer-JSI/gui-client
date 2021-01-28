// import interfaces
import { ICollapse } from "Interfaces";
// import modules
import { useState, useEffect, useRef } from "react";
// import styles and images
import styles from "./styles.module.scss";

export default function Collapse(props: ICollapse) {
  // get the props
  const { collapsed = true, children } = props;
  // set the initial states
  const [collapse, setCollapse] = useState(collapsed);
  const [showMore, setShowMore] = useState(false);
  // set content references
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // check if we need the show more button
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      if ((height - 2) / 16 > 3.4) {
        setShowMore(true);
      }
    }
  }, [containerRef]);

  /**
   * Change the collapse status.
   */
  function showHidden() {
    collapse ? setCollapse(false) : setCollapse(true);
  }

  return (
    <>
      <div className={collapse ? styles.collapsed : styles.extended}>
        <div className={styles.content} ref={containerRef}>
          {children}
        </div>
      </div>
      {showMore ? (
        <button className={styles.button} onClick={showHidden}>
          {collapse ? "...Show More" : "...Hide"}
        </button>
      ) : null}
    </>
  );
}
