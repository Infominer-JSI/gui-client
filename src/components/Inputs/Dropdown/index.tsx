// import modules and components
import { useState, useEffect, useRef } from "react";
import Button from "components/Inputs/Button";
import DropdownList from "./DropdownList";

// import styles
import cn from "classnames";
import styles from "./styles.module.scss";

//===============================================
// Define the component interfaces
//===============================================

interface IDropdown {
  className?: any;
  selectedId: number;
  disabled?: boolean;
  options: string[];
  onClick?: (id: number) => void;
  buttonSize?: "small" | "medium" | "large";
  buttonType?: "full" | "outline";
  buttonIntensity?: "light" | "dark";
}

//===============================================
// Define the component
//===============================================

export default function Dropdown(props: IDropdown) {
  // get the metadata for creating the navigation dropdown
  const {
    className,
    selectedId,
    options,
    disabled,
    onClick,
    buttonSize = "small",
    buttonType = "outline",
    buttonIntensity = "light",
  } = props;
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

  const containerName = cn(styles.container, className);

  return (
    <div className={containerName} ref={containerRef}>
      <Button
        className={styles.button}
        disabled={disabled}
        type={buttonType}
        size={buttonSize}
        color="gray"
        intensity={buttonIntensity}
        onClick={disabled ? () => {} : toggleDropdown}
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
