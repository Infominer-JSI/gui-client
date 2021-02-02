// import interfaces
import { INavigation, ISubset } from "Interfaces";
// import modules and components
import React, { useState, useEffect, useRef } from "react";
import NavigationButton from "./NavigationButton";
import NavigationDropdown from "./NavigationDropdown";
// import styles
import styles from "./styles.module.scss";

export default function Navigation(props: INavigation) {
  // get the metadata for creating the navigation dropdown
  const { selectedId, dataset } = props;
  const [hidden, setHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // set the on outside click
  useEffect(() => {
    /** Handle what to do if user clicks outside the navigation */
    function handleClickOutside(event: any) {
      if (!containerRef.current?.contains(event.target)) {
        setHidden(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  // toggle showing the dropdown element
  const toggleDropdown = () => {
    setHidden(!hidden);
  };

  const selected = dataset.getSubset(selectedId) as ISubset;

  return (
    <div className={styles.container} ref={containerRef}>
      <h1>Navigation</h1>
      <NavigationButton selected={selected} onClick={toggleDropdown} />
      <NavigationDropdown
        hidden={hidden}
        selectedId={selectedId}
        dataset={dataset}
        onClick={toggleDropdown}
      />
    </div>
  );
}
