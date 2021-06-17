// import modules
import { useState, useEffect, useRef } from "react";
import Button from "components/Inputs/Button";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

export interface ICollapse {
  title?: string;
  collapsed?: boolean;
  maxHeight?: number;
  children: any;
}

//===============================================
// Define the component
//===============================================

export default function Collapse(props: ICollapse) {
  // get the props
  const { collapsed = true, maxHeight = 50, children } = props;
  // set the initial states
  const [collapse, setCollapse] = useState(collapsed);
  const [showMore, setShowMore] = useState(false);
  // set content references
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // check if we need the show more button
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      if (height > maxHeight) {
        setShowMore(true);
      }
    }
  }, [maxHeight, containerRef]);

  /**
   * Change the collapse status.
   */
  function showHidden() {
    collapse ? setCollapse(false) : setCollapse(true);
  }

  let height = collapse ? maxHeight : 100;
  if (containerRef.current) {
    const offsetHeight = containerRef.current?.offsetHeight;
    height = collapse ? maxHeight : offsetHeight;
  }

  const showButton = showMore ? (
    <Button
      className={styles.button}
      type="full"
      size="small"
      color="gray"
      intensity="light"
      onClick={showHidden}
      text={collapse ? "Show More" : "Show Less"}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.controller}>{showButton}</div>
      <div className={styles.parent} style={{ maxHeight: `${height}px` }}>
        <div className={styles.content} ref={containerRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
