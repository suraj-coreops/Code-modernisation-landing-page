/** A laptop shell to put a screen miniature inside.
 *
 *  Purely decorative, so the whole frame is hidden from assistive tech - the
 *  screen's content is marketing illustration, not information a reader would
 *  miss. */
export default function LaptopFrame({ className = "", children }) {
  return (
    <div className={["laptop", className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className="laptop-lid">
        <span className="laptop-cam" />
        <div className="laptop-screen">
          {children}
          <span className="laptop-glare" />
        </div>
      </div>
      <div className="laptop-base">
        <span className="laptop-notch" />
      </div>
      <span className="laptop-shadow" />
    </div>
  );
}
