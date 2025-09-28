import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Register the ScrollTrigger plugin with GSAP */
gsap.registerPlugin(ScrollTrigger);

type AnimationType = "to" | "from" | "fromTo";

interface UseScrollFadeInProps {
  trigger?: string | Element | null;
  animationType?: AnimationType;
  animationProps?: gsap.TweenVars & {
    fromVars?: gsap.TweenVars;
    toVars?: gsap.TweenVars;
  };
  scrollTrigger?: boolean;
  scrollOptions?: ScrollTrigger.Vars;
  reverseOnLeave?: boolean;
  once?: boolean;
  scrub?: boolean | number;
}

export function useScrollFadeIn<T extends HTMLElement = HTMLDivElement>({
  trigger,
  animationType = "to",
  animationProps = {},
  scrollTrigger = false,
  scrollOptions = {},
  reverseOnLeave = false,
  once = false,
  scrub = false,
}: UseScrollFadeInProps): RefObject<T | null> {
  /* Ref to attach to the DOM element that will be animated */
  const elementRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    /* Create a scoped GSAP context to isolate animations and cleanup automatically */
    const ctx = gsap.context(() => {
      let anim: gsap.core.Tween | undefined;

      /* Configure ScrollTrigger if enabled */
      const stConfig: ScrollTrigger.Vars | undefined = scrollTrigger
        ? {
            /* Use provided trigger or default to the animated element */
            trigger: trigger || elementRef.current!,
            scrub: scrub || undefined, // sync animation with scroll if scrub is true
            /* toggleActions control play/reverse behavior when element enters/exits viewport */
            toggleActions: !scrub
              ? reverseOnLeave
                ? "play reverse play reverse"
                : once
                ? "play none none none"
                : "play none none none"
              : undefined,
            ...scrollOptions, // allow overriding any ScrollTrigger options
          }
        : undefined;

      /* Kill previous animation if it exists to prevent duplicates */
      if (anim) {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      }

      /* Create the GSAP animation based on the type */
      if (animationType === "from") {
        anim = gsap.from(elementRef.current!, {
          ...animationProps,
          scrollTrigger: stConfig,
        });
      } else if (animationType === "fromTo") {
        const { fromVars = {}, toVars = {} } = animationProps;
        anim = gsap.fromTo(elementRef.current!, fromVars, {
          ...toVars,
          scrollTrigger: stConfig,
        });
      } else {
        anim = gsap.to(elementRef.current!, {
          ...animationProps,
          scrollTrigger: stConfig,
        });
      }

      /* Cleanup this specific animation when the component unmounts */
      return () => {
        if (anim?.scrollTrigger) anim.scrollTrigger.kill(); // remove ScrollTrigger instance
        anim?.kill(); // kill the animation
      };
    }, elementRef);

    /* Cleanup the GSAP context when the component unmounts */
    return () => ctx.revert();
  }, [
    animationType,
    animationProps,
    scrollTrigger,
    scrollOptions,
    reverseOnLeave,
    once,
    scrub,
    trigger,
  ]);

  return elementRef;
}
