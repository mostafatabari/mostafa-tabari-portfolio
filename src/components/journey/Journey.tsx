import { useScrollFadeIn } from "../../hooks/scrollFadeIn/useScrollFadeIn.ts";

/* Props interface for Journey component */
interface JourneyProps {
  reverse?: boolean;
  year?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

/* Journey component displays a timeline entry with image and text */
function Journey({
  reverse = false,
  year = "YEAR",
  title = "TITLE",
  subtitle = "SUBTITLE",
  description = "DESCRIPTION",
  imageSrc = "IMAGE_SRC",
  imageAlt = "IMAGE_ALT",
}: JourneyProps) {
  /* Hook to apply scroll fade-in animation using GSAP or similar */
  const ref = useScrollFadeIn<HTMLDivElement>({
    animationType: "fromTo",
    animationProps: {
      fromVars: { opacity: 0, y: 50 } /* Initial animation state */,
      toVars: {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      } /* Final animation state */,
    },
    scrollTrigger: true /* Activate animation on scroll */,
    scrollOptions: {
      start: "top 100%",
      end: "bottom 50%",
    } /* Scroll trigger range */,
    reverseOnLeave: false /* Don't reverse animation when leaving viewport */,
    once: true /* Animate only once */,
    scrub: false /* No scrubbing effect */,
  });

  return (
    <div
      ref={ref}
      className={`mb-16 flex gap-5 justify-center lg:justify-between lg:items-center ${
        reverse
          ? "flex-col-reverse lg:flex-row-reverse"
          : "flex-col-reverse lg:flex-row"
      }`}
    >
      <div className="w-full lg:max-w-3/5 flex flex-col flex-nowrap justify-center">
        <div className="mb-4">
          <span className="text-body-sm text-accent">{year}</span>

          <h3 className="text-body text-primary font-bold">{title}</h3>

          <p className="text-body text-primary ">{subtitle}</p>
        </div>

        <p className="text-h4 text-black">{description}</p>
      </div>

      <div>
        <img
          className="w-104 aspect-[4/3] lg:min-w-100 lg:aspect-[4/3] mx-auto rounded-2xl object-cover"
          src={imageSrc}
          alt={imageAlt}
          loading="lazy" /* Lazy loading improves performance */
        />
      </div>
    </div>
  );
}

export default Journey;
