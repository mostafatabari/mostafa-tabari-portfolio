import styles from "./navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Icon from "../iconsSvg/IconsSvg";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import DarkModeToggle from "../darkModeToggle/DarkModeToggle";

/* Register GSAP plugin to enable smooth scrolling animations */
gsap.registerPlugin(ScrollToPlugin);

const socialIcons: Array<"instagram" | "linkedin" | "github"> = [
  "instagram",
  "linkedin",
  "github",
];

const Navbar = () => {
  /* State to track if the navbar animation has already been played during this session */
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    /* Retrieve animation status from sessionStorage */
    const animated = sessionStorage.getItem("navbarAnimated");
    if (!animated) {
      /* If not played before, set animation state and save it in sessionStorage */
      setHasAnimated(true);
      sessionStorage.setItem("navbarAnimated", "true");
    }
  }, []);

  /* State to track if the user has scrolled the page to apply shadow effect */
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    /* Scroll handler: sets isScrolled to true if scrollY > 10px */
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    /* Add scroll listener */
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Get the current route path to highlight the active link */
  const location = useLocation();

  /* State to track mobile menu open/close */
  const [isOpen, setIsOpen] = useState(false);

  /* References for detecting clicks outside the mobile menu */
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    /* Close mobile menu if user clicks outside of menu or toggle button */
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    /* Automatically close mobile menu when window is resized */
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-14 md:h-16 lg:h-20 w-full  bg-light text-black  flex justify-center fixed top-0 left-0  z-50 duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Overlay backdrop for mobile menu with blur and opacity */}
      <div
        className={`fixed inset-0 w-screen h-screen border-primary opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`h-full w-full max-w-7xl px-4 flex justify-between items-center ${
          hasAnimated ? styles["animate-slideDown"] : ""
        }`}
      >
        {/* Light mode logo, shown only when dark mode is off */}
        <div className="block dark:hidden">
          <Link to="/">
            <svg
              viewBox="100 0 1024 768"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40"
            >
              <g transform="matrix(4.5216 0 0 4.5216 512 384)">
                <g transform="matrix(1 0 0 1 -41.76 0)">
                  <path
                    style={{ fill: "#60A5FA" }}
                    transform="translate(-99.928,-96.1684)"
                    d="M 131.608 69.9059 C 128.008 69.0419 124.336 70.6979 122.608 74.0099 L 103.744 110.5139 C 102.808 112.3139 101.08 112.5299 100.432 112.5299 C 99.784 112.5299 98.056 112.3139 97.12 110.5139 L 78.4 74.2979 C 76.528 70.6979 72.64 68.9699 68.68 69.9059 C 64.792 70.8419 62.128 74.2259 62.128 78.2579 L 62.128 121.1699 L 72.28 121.1699 L 72.28 84.6659 L 88.12 115.1939 C 90.496 119.8019 95.248 122.6819 100.432 122.6819 C 105.616 122.6819 110.368 119.8019 112.744 115.1939 L 127.576 86.6099 L 127.576 121.1699 L 137.728 121.1699 L 137.728 77.6819 C 137.728 74.0099 135.208 70.7699 131.608 69.9059 Z"
                  />
                </g>
                <g transform="matrix(1 0 0 1 9.396 20.0336)">
                  <path
                    style={{ fill: "#60A5FA" }}
                    transform="translate(-99.964,-116.2019)"
                    d="M 103.528 111.0899 L 96.4 111.0899 C 95.536 111.0899 94.888 111.8099 94.888 112.6739 L 94.888 119.8019 C 94.888 120.5939 95.536 121.3139 96.4 121.3139 L 103.528 121.3139 C 104.392 121.3139 105.04 120.5939 105.04 119.8019 L 105.04 112.6739 C 105.04 111.8099 104.392 111.0899 103.528 111.0899 Z"
                  />
                </g>
                <g transform="matrix(1 0 0 1 49.068 -0.1984)">
                  <path
                    style={{ fill: "#3B82F6" }}
                    transform="translate(-100,-95.9699)"
                    d="M 128.98 70.7699 L 71.02 70.7699 C 70.228 70.7699 69.508 71.4179 69.508 72.2819 L 69.508 79.4099 C 69.508 80.2739 70.228 80.9219 71.02 80.9219 L 94.924 80.9219 L 94.924 119.6579 C 94.924 120.4499 95.572 121.1699 96.436 121.1699 L 103.564 121.1699 C 104.428 121.1699 105.076 120.4499 105.076 119.6579 L 105.076 80.9219 L 128.98 80.9219 C 129.772 80.9219 130.492 80.2739 130.492 79.4099 L 130.492 72.2819 C 130.492 71.4179 129.772 70.7699 128.98 70.7699 Z"
                  />
                </g>
              </g>
            </svg>
          </Link>
        </div>

        {/* Dark mode logo, shown only when dark mode is active */}
        <div className="hidden dark:block">
          <Link to="/">
            <svg
              viewBox="100 0 1024 768"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40"
            >
              <g transform="matrix(4.5216 0 0 4.5216 512 384)">
                <g transform="matrix(1 0 0 1 -41.76 0)">
                  <path
                    style={{ fill: "#FFFFFF" }}
                    transform="translate(-99.928,-96.1684)"
                    d="M 131.608 69.9059 C 128.008 69.0419 124.336 70.6979 122.608 74.0099 L 103.744 110.5139 C 102.808 112.3139 101.08 112.5299 100.432 112.5299 C 99.784 112.5299 98.056 112.3139 97.12 110.5139 L 78.4 74.2979 C 76.528 70.6979 72.64 68.9699 68.68 69.9059 C 64.792 70.8419 62.128 74.2259 62.128 78.2579 L 62.128 121.1699 L 72.28 121.1699 L 72.28 84.6659 L 88.12 115.1939 C 90.496 119.8019 95.248 122.6819 100.432 122.6819 C 105.616 122.6819 110.368 119.8019 112.744 115.1939 L 127.576 86.6099 L 127.576 121.1699 L 137.728 121.1699 L 137.728 77.6819 C 137.728 74.0099 135.208 70.7699 131.608 69.9059 Z"
                  />
                </g>
                <g transform="matrix(1 0 0 1 9.396 20.0336)">
                  <path
                    style={{ fill: "#FFFFFF" }}
                    transform="translate(-99.964,-116.2019)"
                    d="M 103.528 111.0899 L 96.4 111.0899 C 95.536 111.0899 94.888 111.8099 94.888 112.6739 L 94.888 119.8019 C 94.888 120.5939 95.536 121.3139 96.4 121.3139 L 103.528 121.3139 C 104.392 121.3139 105.04 120.5939 105.04 119.8019 L 105.04 112.6739 C 105.04 111.8099 104.392 111.0899 103.528 111.0899 Z"
                  />
                </g>
                <g transform="matrix(1 0 0 1 49.068 -0.1984)">
                  <path
                    style={{ fill: "#F3F4F6" }}
                    transform="translate(-100,-95.9699)"
                    d="M 128.98 70.7699 L 71.02 70.7699 C 70.228 70.7699 69.508 71.4179 69.508 72.2819 L 69.508 79.4099 C 69.508 80.2739 70.228 80.9219 71.02 80.9219 L 94.924 80.9219 L 94.924 119.6579 C 94.924 120.4499 95.572 121.1699 96.436 121.1699 L 103.564 121.1699 C 104.428 121.1699 105.076 120.4499 105.076 119.6579 L 105.076 80.9219 L 128.98 80.9219 C 129.772 80.9219 130.492 80.2739 130.492 79.4099 L 130.492 72.2819 C 130.492 71.4179 129.772 70.7699 128.98 70.7699 Z"
                  />
                </g>
              </g>
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle button, visible only on small screens */}
        <button ref={buttonRef} className="md:hidden">
          <Icon
            type="bars"
            className="text-h4 text-secondary cursor-pointer hover:text-blue-500 duration-300"
            onClick={() => setIsOpen(true)}
          />
        </button>
        <ul
          ref={menuRef}
          className={`w-80 h-screen bg-light flex flex-col absolute top-0 md:w-fit md:h-full md:bg-transparent md:relative md:top-0 md:right-0 transition-all duration-300 z-40 ${
            isOpen ? "right-0" : "-right-full"
          }`}
          /* Prevent menu from closing when clicking inside menu */
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Mobile menu top section: Dark mode toggle + close button */}
          <li className="w-full min-h-24 px-5 border-b border-secondary flex justify-between items-center md:hidden">
            <div className="cursor-pointer">
              <DarkModeToggle />
            </div>

            <button className="md:hidden">
              <Icon
                type="xMark"
                className="text-h4 text-secondary cursor-pointer hover:text-blue-500 duration-300"
                onClick={() => setIsOpen(false)}
              />
            </button>
          </li>

          {/* Main navigation links */}
          <li className="min-h-fit mx-5 mt-5 mb-auto flex flex-col gap-4 md:mx-0 md:my-0 md:h-full md:flex md:flex-row md:justify-end md:items-center md:gap-8">
            <Link
              to="/"
              className={`cursor-pointer text-body-sm transition-colors duration-300 ${
                location.pathname === "/" ? "text-blue-500" : "text-black"
              } hover:text-blue-500`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`cursor-pointer text-body-sm transition-colors duration-300 ${
                location.pathname === "/about" ? "text-blue-500" : "text-black"
              } hover:text-blue-500`}
            >
              About
            </Link>

            <Link
              to="/projects"
              className={`cursor-pointer text-body-sm transition-colors duration-300 ${
                location.pathname === "/projects"
                  ? "text-blue-500"
                  : "text-black"
              } hover:text-blue-500`}
            >
              Projects
            </Link>

            <Link
              to="/contact"
              className={`cursor-pointer text-body-sm transition-colors duration-300 ${
                location.pathname === "/contact"
                  ? "text-blue-500"
                  : "text-black"
              } hover:text-blue-500`}
            >
              Contact
            </Link>

            <div className="block mb-1 md:hidden"></div>
          </li>

          {/* Social media icons */}
          <li className="w-full h-28 border-t border-secondary md:hidden">
            <p className="h-1/2 text-secondary text-caption indent-6 flex items-center">
              Connect with me
            </p>

            <div className="ml-5 flex items-center gap-2">
              {socialIcons.map((icon) => (
                <Icon
                  key={icon}
                  type={icon}
                  className="text-2xl text-secondary hover:text-blue-500 hover:scale-110 duration-300 cursor-pointer"
                />
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
