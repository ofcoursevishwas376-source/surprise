export function Bloom() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="bloom-rose absolute -top-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 animate-float" />
      <div className="bloom-rose absolute bottom-0 right-0 h-[40vh] w-[40vw] opacity-60" style={{ animationDelay: "2s" }} />
      <div className="bloom-rose absolute top-1/3 left-0 h-[35vh] w-[35vw] opacity-40" style={{ animationDelay: "4s" }} />
    </div>
  );
}
