import { useEffect, useRef, useState } from "react";

/** Fade/slide a block in the first time it reaches the viewport.
 *
 *  One-shot on purpose: re-animating on the way back UP makes a long page feel
 *  unstable, so the observer disconnects as soon as the element has been seen.
 *  Without IntersectionObserver the content is simply shown - never hidden,
 *  since a missing API must not cost anyone the page. */
export function Reveal({ variant = "up", delay = 0, className = "", as: Tag = "div", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setShown(true);
          io.disconnect();
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["fx", variant, shown ? "in" : "", className].filter(Boolean).join(" ")}
      style={{ transitionDelay: delay ? delay + "ms" : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Lay a block back in 3D and stand it up as the page scrolls past.
 *
 *  Driven from a scroll listener rather than a scroll-linked animation so it
 *  degrades to "flat and readable" everywhere, and it is skipped outright for a
 *  reader who asked for reduced motion. */
export function TiltOnScroll({ maxTilt = 20, className = "", children }) {
  const wrap = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = wrap.current;
    const target = inner.current;
    if (reduced || !el || !target) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the block's top is at the bottom of the screen, 1 once it has
      // travelled to roughly the upper third: the whole tilt resolves while the
      // device is still on screen rather than after it has gone past.
      const p = Math.min(1, Math.max(0, 1 - (rect.top - vh * 0.3) / (vh * 0.7)));
      target.style.transform = "rotateX(" + (maxTilt * (1 - p)).toFixed(2) + "deg)";
    };
    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame != null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [maxTilt]);

  return (
    <div ref={wrap} className={["fx-tilt", className].filter(Boolean).join(" ")}>
      <div ref={inner} className="fx-tilt-inner">
        {children}
      </div>
    </div>
  );
}
