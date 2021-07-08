// import modules and components
import { useState, useEffect, useRef } from "react";
import DatasetNavigationButton from "./DatasetNavigationButton";
import DatasetNavigationDropdown from "./DatasetNavigationDropdown";
import DatasetNavigationMetadata from "./DatasetNavigationMetadata";
import DatasetNavigationActions from "./DatasetNavigationActions";

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
  const { store, selectedId, handleToggleSidebar = () => {} } = props;

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
        <DatasetNavigationButton selected={selected} onClick={toggleDropdown} />
        <DatasetNavigationDropdown
          store={store}
          selectedId={selectedId}
          onClick={toggleDropdown}
          hidden={hidden}
        />
      </div>
      <div className={styles.metadata}>
        <DatasetNavigationMetadata store={store} subsetId={selectedId} />
      </div>
      <div className={styles.actions}>
        <DatasetNavigationActions store={store} subsetId={selectedId} />
      </div>
    </div>
  );
}
