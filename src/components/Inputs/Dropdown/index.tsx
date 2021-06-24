// import modules and components
import { useState, useEffect, useRef } from "react";
import Button from "components/Inputs/Button";
import DropdownList from "./DropdownList";

// import styles
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

interface IDropdown {
  className?: any;
  selectedId: number;
  options: string[];
  onClick?: (id: number) => void;
}

//===============================================
// Define the component
//===============================================

export default function Dropdown(props: IDropdown) {
  // get the metadata for creating the navigation dropdown
  const { className, selectedId, options, onClick } = props;
  const [hidden, setHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle what to do if user clicks outside the navigation
    function handleClickOutside(event: any) {
      if (!containerRef.current?.contains(event.target)) {
        setHidden(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Unbind the event listener on clean up
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  // toggle showing the dropdown element
  const toggleDropdown = () => {
    setHidden(!hidden);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <Button
        className={className}
        type="outline"
        size="small"
        color="gray"
        intensity="light"
        onClick={toggleDropdown}
        text={options[selectedId]}
      />
      <DropdownList
        hidden={hidden}
        options={options}
        selectedId={selectedId}
        toggle={toggleDropdown}
        onClick={onClick}
      />
    </div>
  );
}
