// import interfaces
import { IButton } from "Interfaces";
// import modules
import cn from "classnames";
// import styles and images
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Button(props: IButton) {
  // get dataset information and set their state
  const {
    type = "full",
    color = "gray",
    size = "medium",
    intensity = "dark",
    icon,
    text,
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
    }
  );
  return (
    <button className={buttonStyle} onClick={onClick}>
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
