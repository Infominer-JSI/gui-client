// import modules and components
import { useState, useEffect, useRef } from "react";
import NavigationButton from "./NavigationButton";
import NavigationDropdown from "./NavigationDropdown";

// import styles
import styles from "./styles.module.scss";

import { useStore, getSubset } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

import { ISubset } from "Interfaces";

interface INavigation {
  selectedId: number;
  onClick?: any;
}

//===============================================
// Define the component
//===============================================

export default function Navigation(props: INavigation) {
  // get the gobal store
  const { store } = useStore();
  // get the metadata for creating the navigation dropdown
  const { selectedId } = props;

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

  const selected = getSubset(store, selectedId) as ISubset;

  return (
    <div className={styles.container} ref={containerRef}>
      <NavigationButton selected={selected} onClick={toggleDropdown} />
      <NavigationDropdown
        hidden={hidden}
        selectedId={selectedId}
        onClick={toggleDropdown}
      />
    </div>
  );
}
