// import modules and components
import { useState, useEffect, useRef } from "react";
import NavigationButton from "./NavigationButton";
import NavigationDropdown from "./NavigationDropdown";
import NavigationMetadata from "./NavigationMetadata";

// import styles
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { getSubset, IStoreContext } from "utils/GlobalState";

//===============================================
// Define the state interfaces
//===============================================

import { ISubset } from "Interfaces";

interface INavigation {
  store: IStoreContext;
  selectedId: number;
  onClick?: any;
  handleToggleSidebar: (value: boolean) => void;
}

//===============================================
// Define the component
//===============================================

export default function Navigation(props: INavigation) {
  // get the metadata for creating the navigation dropdown
  const { store, selectedId, handleToggleSidebar } = props;

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  // toggle showing the dropdown element
  const toggleDropdown = () => {
    setHidden(!hidden);
  };

  const selected = getSubset(store, selectedId) as ISubset;

  return (
    <div className={styles.container}>
      <div className={styles.toggle} onClick={() => handleToggleSidebar(true)}>
        <div>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={styles.navigation} ref={containerRef}>
        <NavigationButton selected={selected} onClick={toggleDropdown} />
        <NavigationDropdown
          store={store}
          selectedId={selectedId}
          onClick={toggleDropdown}
          hidden={hidden}
        />
      </div>
      <div className={styles.metadata}>
        <NavigationMetadata store={store} subsetId={selectedId} />
      </div>
    </div>
  );
}
