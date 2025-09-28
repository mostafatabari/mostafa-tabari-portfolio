import { useState, useEffect, useCallback } from "react";
import Icon from "../iconsSvg/IconsSvg.tsx";
import DarkModeToggle from "../darkModeToggle/DarkModeToggle.tsx";

const SocialSidebar = () => {
  /* State to track if user has scrolled past a certain point to show "scroll to top" button */
  const [isScrolled, setIsScrolled] = useState(false);

  /* Scroll handler wrapped with useCallback to prevent unnecessary re-renders */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 450);
  }, []);

  useEffect(() => {
    /* Add scroll event listener */
    window.addEventListener("scroll", handleScroll, { passive: true });

    /* Cleanup event listener on unmount */
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="fixed bottom-8 right-4 md:p-2 flex flex-col items-center justify-center gap-1 overflow-hidden rounded-full md:rounded-md bg-light-sec shadow-md duration-500 z-20">
      {/* Scroll-to-top button, visible only after scrolling past threshold */}
      {isScrolled && (
        <div className="flex items-center justify-center border-secondary-sec md:border-b md:pb-2 md:mb-1">
          <Icon
            type="arrow-up"
            className="h-0 cursor-pointer text-xl text-secondary transition-all duration-500 m-2 md:m-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // Smooth scroll to top
          />
        </div>
      )}

      {/* Social media icons */}
      <div className="flex-col justify-center items-center gap-1 hidden md:flex">
        <Icon
          type="instagram"
          className="cursor-pointer text-2xl text-secondary hover:text-blue-500 duration-300"
        />

        <Icon
          type="linkedin"
          className="cursor-pointer text-2xl text-secondary hover:text-blue-500 duration-300"
        />

        <Icon
          type="github"
          className="cursor-pointer text-2xl text-secondary hover:text-blue-500 duration-300"
        />
      </div>

      {/* Dark mode toggle button */}
      <div className="items-center justify-center w-6 h-6 mt-3.5 pt-5 -translate-y-2.5 border-t border-secondary-sec cursor-pointer hidden md:flex">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default SocialSidebar;
