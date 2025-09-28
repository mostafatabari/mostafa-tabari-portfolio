import { useEffect, useState } from "react";
import { useScrollFadeIn } from "../../hooks/scrollFadeIn/useScrollFadeIn.ts";

interface ProjectsProps {
  reverse?: boolean;
  title?: string;
  overview?: string;
  tech?: string;
  imageSrc?: string;
  imageAlt?: string;
  role?: string;
  achievements?: string;
}

const Projects = ({
  reverse = false,
  title = "Project Title",
  overview = "Project overview goes here.",
  tech = "Tech stack goes here.",
  imageSrc = "IMAGE_SRC",
  imageAlt = "IMAGE_ALT",
  role = "Your role goes here.",
  achievements = "Achievements go here.",
}: ProjectsProps) => {
  /* Custom hook to handle scroll-based fade-in and animation */
  const scrollRef = useScrollFadeIn<HTMLDivElement>({
    animationType: "fromTo",
    animationProps: {
      fromVars: { scale: 0.8, y: 0 },
      toVars: { scale: 1, y: 0, duration: 1.5, ease: "power2.out" },
    },
    scrollTrigger: true,
    scrollOptions: { start: "top 100%", end: "bottom 80%" },
    reverseOnLeave: true, // Animate in reverse when leaving viewport
    once: true, // Animate only once
    scrub: true, // Sync animation with scroll
  });

  /* State for dynamic Y-translation when hovered */
  const [translateY, setTranslateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    /* Calculate translation distance between container and content height */
    const updateHeights = () => {
      if (scrollRef.current) {
        const parentHeight = scrollRef.current.offsetHeight;
        const childHeight = scrollRef.current.scrollHeight;
        setTranslateY(childHeight - parentHeight);
      }
    };

    updateHeights();

    /* Observe size changes of the container for responsive adjustments */
    const observer = new ResizeObserver(updateHeights);
    if (scrollRef.current) observer.observe(scrollRef.current);

    /* Update on window resize as well */
    window.addEventListener("resize", updateHeights);

    /* Cleanup observers and listeners on unmount */
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeights);
    };
  }, [scrollRef]);

  return (
    <div
      ref={scrollRef}
      className={`
        group max-w-2xl aspect-[7/5] lg:aspect-[7/3] bg-light-sec p-6 md:p-8 mx-auto mb-10 
        border border-secondary rounded-md shadow-sm flex justify-between overflow-hidden
        ${
          reverse ? "flex-row-reverse" : "flex-row"
        }  // Flip layout if reverse is true
        relative
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-12
        after:pointer-events-none after:bg-gradient-to-b after:from-transparent after:to-white
        dark:after:to-current
        lg:after:content-none
      `}
      /* Update hover state to trigger translateY animation */
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className=" w-full lg:w-[200%] h-fit lg:h-full flex flex-none lg:flex-row flex-nowrap lg:justify-left lg:items-start items-center gap-5 flex-col-reverse justify-end lg:group-hover:-translate-x-1/2 group-hover:-translate-x-0 lg:group-hover:-translate-y-0 duration-500 ease-in-out"
        style={{ transform: `translateY(${isHovered ? -translateY : 0}px)` }} // Translate Y on hover
      >
        <div className="w-full h-1/3 lg:w-1/3 order-2 lg:order-1">
          <h3 className="mb-4 text-h4 text-accent">{title}</h3>
          <p className="mb-2 text-body text-black">{overview}</p>
          <p className="text-caption text-secondary">{tech}</p>
        </div>

        <img
          className="lg:w-1/3 lg:h-full w-full group-h-1/3 aspect-[2/1] order-3 lg:order-2 rounded-sm lg:rounded-2xl object-cover"
          src={imageSrc}
          alt={imageAlt}
        />

        <div className="lg:w-1/3 h-1/3 order-1 lg:order-3 w-full">
          <p className="mb-2 text-body text-black">{role}</p>
          <p className="text-body text-black">{achievements}</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
