import { useEffect, useRef, Suspense, lazy } from "react";

interface SectionProps {
  setIsSectionVisible?: (v: boolean) => void;
}

/* Lazy load sections for performance optimization */
const AboutMe = lazy(() => import("../journey/AboutMe"));
const MyProjects = lazy(() => import("../projects/MyProjects"));

/* MainContent component renders main page sections and observes visibility */
function MainContent({ setIsSectionVisible }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  /* useEffect to observe intersection of the section for visibility tracking */
  useEffect(() => {
    if (!setIsSectionVisible || !ref.current) return;

    /* IntersectionObserver watches the section visibility (threshold 10%) */
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    /* Cleanup observer on unmount */
    return () => {
      observer.disconnect(); // safer cleanup
    };
  }, [setIsSectionVisible]);

  return (
    <div
      ref={ref}
      className="w-full h-full bg-secondary border-t border-b border-secondary flex justify-center relative"
    >
      <div className="w-full max-w-2xl px-4 py-10 flex flex-col justify-center items-center lg:w-full lg:max-w-7xl lg:px-4 lg:py-10">
        <h3
          id="about-section"
          aria-label="About Me Section"
          className="my-12 text-black text-h1 font-semibold"
        >
          About Me
        </h3>

        <Suspense fallback={<div>Loading About Me...</div>}>
          <AboutMe />
        </Suspense>

        <h3
          id="project-section"
          aria-label="My Projects Section"
          className="my-12 text-black text-h1 font-semibold"
        >
          My Projects
        </h3>

        <Suspense fallback={<div>Loading Projects...</div>}>
          <MyProjects />
        </Suspense>
      </div>
    </div>
  );
}

export default MainContent;
