import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import MostafaTabari from "../../assets/images/MostafaTabari.jpg";

interface AboutProps {
  isSectionVisible: boolean;
}

const About = ({ isSectionVisible }: AboutProps) => {
  /* State to track scroll offset for parallax effect */
  const [scrollY, setScrollY] = useState(0);

  /* Reference to the main container div */
  const ref = useRef<HTMLDivElement>(null);

  /* Ref to store the initial scroll position when section becomes visible */
  const offsetRef = useRef<number | null>(null);

  /* Ref to track if a scroll frame is already scheduled */
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const nowScrollY = window.scrollY;

          /* If section is visible, calculate parallax offset */
          if (isSectionVisible) {
            if (offsetRef.current === null) {
              /* Store initial scroll position for relative calculation */
              offsetRef.current = nowScrollY;
            }
            if (offsetRef.current !== null) {
              /* Set scrollY state to half of scroll difference for smooth parallax */
              setScrollY(Math.max(0, (nowScrollY - offsetRef.current) / 2));
            }
          }

          /* Reset parallax when scrolled to top */
          if (nowScrollY === 0) {
            offsetRef.current = null;
            setScrollY(0);
          }

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    /* Add scroll listener once */
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSectionVisible]);

  /* Smooth scroll to a target section using GSAP */
  const handleScrollTo = useCallback((id: string, offset: number = 100) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `#${id}`,
        offsetY: offset,
      },
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={ref}
      /* Apply parallax translation effect based on scrollY state */
      style={{ transform: `translateY(${scrollY}px)` }}
      className="w-full mt-14 md:mt-16 lg:mt-20 bg-secondary flex justify-center -z-10"
    >
      <div className="max-w-3xl px-4 py-10 flex flex-col-reverse justify-center lg:max-w-7xl lg:w-full lg:flex lg:flex-row lg:justify-between lg:items-center lg:px-4 lg:py-10">
        <div className="w-full lg:max-w-2/3">
          <h3 className="text-accent text-body">
            Mostafa Tabari – Front-End Developer
          </h3>

          <h1 className="mb-6 text-black text-h1 font-semibold whitespace-pre-line">
            Hi, I'm Mostafa Tabari
          </h1>

          <p className="text-h4 text-black">
            a Front-End Developer with a pretty unique mix of experience. I
            kicked off my career in civil engineering, but over the last few
            years, I’ve been fully immersed in the world of React and Next.js,
            turning ideas into interactive, smooth web experiences.
          </p>
          <br />

          <p className="text-h4 text-black">
            Skills & Expertise: React, Next.js, Node.js, TypeScript A bit about
            me: 35, married, team player, problem solver, and genuinely obsessed
            with creating engaging user experiences.
          </p>
          <br />

          <p className="text-body text-primary">
            "When I’m not coding, you’ll probably find me in the kitchen
            experimenting with recipes or messing around with arts and crafts. I
            love blending creativity with tech—it’s how you make digital
            experiences truly memorable."
          </p>

          <div className="mt-8 flex justify-left items-center gap-5 ">
            <span
              className="px-4 py-2 text-white bg-primary hover:bg-blue-600 rounded-sm cursor-pointer"
              onClick={() => handleScrollTo("about-section", 160)}
            >
              About Me
            </span>

            <span
              className="px-4 py-2 text-white bg-primary hover:bg-blue-600 rounded-sm cursor-pointer"
              onClick={() => handleScrollTo("project-section", 160)}
            >
              My Project
            </span>

            <span
              className="px-4 py-2 text-white bg-primary hover:bg-blue-600 rounded-sm cursor-pointer"
              onClick={() => handleScrollTo("contact-section", 80)}
            >
              Contact Me
            </span>
          </div>
        </div>

        <div className=" mb-10 flex justify-center items-center lg:ml-5 lg:mt-0 lg:mb-0 lg:mr-0">
          <img
            className="w-96 aspect-square border-2 border-blue-950 rounded-full shadow-[0_0_10px_5px_rgba(173,216,230,1)]"
            src={MostafaTabari}
            alt="Mostafa Tabari"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
