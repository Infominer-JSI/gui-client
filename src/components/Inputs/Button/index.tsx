// import modules
import cn from "classnames";

// import styles and icons
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";

//===============================================
// Define the state interfaces
//===============================================

interface IButton {
  className?: any;
  onClick?: () => void;
  type: "full" | "outline";
  icon?: "none" | "edit" | "delete" | "download";
  size: "small" | "medium" | "large";
  color: "blue" | "green" | "yellow" | "red" | "gray";
  intensity: "light" | "dark";
  disabled?: boolean;
  text?: string;
}

//===============================================
// Define the component
//===============================================

export default function Button(props: IButton) {
  // get dataset information and set their state
  const {
    type = "full",
    color = "gray",
    size = "medium",
    intensity = "dark",
    icon,
    text,
    disabled,
    className,
    onClick,
  } = props;

  // set the button classes
  const colorClass = getColorClass(color);
  const typeClass = getTypeClass(type);
  const sizeClass = getSizeClass(size);
  const intensityClass = getIntensityClass(intensity);
  // get the icon component
  const iconComponent = getIcon(icon);

  // assign the button style
  const buttonStyle = cn(
    styles.default,
    colorClass,
    typeClass,
    sizeClass,
    intensityClass,
    className,
    {
      [styles.justIcon]: !text,
      [styles.disabled]: disabled,
    }
  );
  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>
      {text} {iconComponent}
    </button>
  );
}

function getColorClass(color?: "blue" | "green" | "yellow" | "red" | "gray") {
  switch (color) {
    case "blue":
      return styles.blue;
    case "green":
      return styles.green;
    case "yellow":
      return styles.yellow;
    case "red":
      return styles.red;
    case "gray":
      return styles.gray;
    default:
      return null;
  }
}

function getTypeClass(type: "outline" | "full") {
  switch (type) {
    case "outline":
      return styles.outline;
    case "full":
      return styles.full;
  }
}

function getSizeClass(size: "small" | "medium" | "large") {
  switch (size) {
    case "small":
      return styles.small;
    case "large":
      return styles.large;
    case "medium":
    default:
      return styles.medium;
  }
}

function getIntensityClass(intensity: "light" | "dark") {
  switch (intensity) {
    case "light":
      return styles.light;
    case "dark":
    default:
      return styles.dark;
  }
}

function getIcon(icon?: "edit" | "delete" | "download" | "none") {
  switch (icon) {
    case "edit":
      return <FontAwesomeIcon icon={faPen} />;
    case "delete":
      return <FontAwesomeIcon icon={faTimes} />;
    case "download":
      return <FontAwesomeIcon icon={faDownload} />;
    default:
      return null;
  }
}
