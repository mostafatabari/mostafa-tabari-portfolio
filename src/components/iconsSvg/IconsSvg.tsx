import React from "react";
import type { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMoon,
  faSun,
  faAdjust,
  faArrowUp,
  faImage,
  faBars,
  faXmark,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

/* Props interface for the Icon component */
interface IconProps {
  type:
    | "sun"
    | "moon"
    | "system"
    | "arrow-up"
    | "instagram"
    | "linkedin"
    | "github"
    | "image"
    | "bars"
    | "xMark"
    | "paperclip";
  className?: string;
  onClick?: (e: MouseEvent<SVGElement | HTMLButtonElement>) => void; // Optional click handler
}

/* Icon component renders different FontAwesome icons based on the "type" prop */
const Icon: React.FC<IconProps> = ({ type, className, onClick }) => {
  switch (type) {
    /* Sun icon for light mode */
    case "sun":
      return (
        <FontAwesomeIcon
          icon={faSun}
          className={className}
          onClick={onClick}
          aria-label="Light mode"
        />
      );

    /* Moon icon for dark mode */
    case "moon":
      return (
        <FontAwesomeIcon
          icon={faMoon}
          className={className}
          onClick={onClick}
          aria-label="Dark mode"
        />
      );

    /* System icon for system theme */
    case "system":
      return (
        <FontAwesomeIcon
          icon={faAdjust}
          className={className}
          onClick={onClick}
          aria-label="System theme"
        />
      );

    /* Arrow-up icon for scroll-to-top */
    case "arrow-up":
      return (
        <span title="Go to top" aria-label="Scroll to top">
          <FontAwesomeIcon
            icon={faArrowUp}
            className={className}
            onClick={onClick}
          />
        </span>
      );

    /* Instagram social icon */
    case "instagram":
      return (
        <a
          href="https://www.instagram.com/mostafatabari"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram profile"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className={className}
            onClick={onClick}
          />
        </a>
      );

    /* Linkedin social icon */
    case "linkedin":
      return (
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className={className}
            onClick={onClick}
          />
        </a>
      );

    /* Github social icon */
    case "github":
      return (
        <a
          href="https://github.com/mostafatabari"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className={className}
            onClick={onClick}
          />
        </a>
      );

    /* Image icon for file uploads or media */
    case "image":
      return (
        <FontAwesomeIcon
          icon={faImage}
          className={className}
          onClick={onClick}
          aria-label="Image"
        />
      );

    /* Bars icon for mobile menu */
    case "bars":
      return (
        <FontAwesomeIcon
          icon={faBars}
          className={className}
          onClick={onClick}
          aria-label="Menu"
        />
      );

    /* X mark icon for closing modals or menus */
    case "xMark":
      return (
        <FontAwesomeIcon
          icon={faXmark}
          className={className}
          onClick={onClick}
          aria-label="Close"
        />
      );

    /* Paperclip icon for attaching files */
    case "paperclip":
      return (
        <FontAwesomeIcon
          icon={faPaperclip}
          className={className}
          onClick={onClick}
          aria-label="Attach"
        />
      );

    /* Default case returns null if type is invalid */
    default:
      return null;
  }
};

export default Icon;
