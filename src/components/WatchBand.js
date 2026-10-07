/*
  Straps + crown drawn around a watch case so the mockup reads as a wristwatch,
  not a floating rounded square. The straps fade toward their far ends to suggest
  the band curving back around the wrist. Render inside the case element (relative).
*/
export default function WatchBand({ size = "md" }) {
  const lg = size === "lg";
  const strapH = lg ? "h-[92px]" : "h-[38px]";
  const strapW = lg ? "w-[64%]" : "w-[62%]";
  const radius = lg ? "rounded-[22px]" : "rounded-[12px]";

  const fadeUp = {
    background: "linear-gradient(to top, #2b2b2f 0%, #1c1c1f 45%, #111113 100%)",
    WebkitMaskImage: "linear-gradient(to top, #000 55%, transparent 100%)",
    maskImage: "linear-gradient(to top, #000 55%, transparent 100%)",
  };
  const fadeDown = {
    background: "linear-gradient(to bottom, #2b2b2f 0%, #1c1c1f 45%, #111113 100%)",
    WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
  };

  return (
    <>
      {/* Top strap */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 ${strapW} ${strapH} ${radius} rounded-b-none shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]`}
        style={fadeUp}
      >
        <span className="absolute inset-x-[14%] bottom-0 h-px bg-white/10" />
      </span>

      {/* Bottom strap with a few holes */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-full left-1/2 -translate-x-1/2 ${strapW} ${strapH} ${radius} rounded-t-none shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]`}
        style={fadeDown}
      >
        <span className="absolute inset-x-[14%] top-0 h-px bg-white/10" />
        <span className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center ${lg ? "top-[30px] gap-[10px]" : "top-[16px] gap-[6px]"}`}>
          {[0, 1].map((i) => (
            <span key={i} className={`rounded-full bg-black/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] ${lg ? "h-[6px] w-[6px]" : "h-[3.5px] w-[3.5px]"}`} />
          ))}
        </span>
      </span>

      {/* Digital crown + side button */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-full rounded-r-[4px] bg-gradient-to-b from-[#3a3a3e] via-[#232326] to-[#3a3a3e] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)] ${
          lg ? "top-[24%] h-[34px] w-[7px]" : "top-[24%] h-[18px] w-[4px]"
        }`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-full rounded-r-[3px] bg-[#2a2a2d] ${
          lg ? "top-[46%] h-[44px] w-[4px]" : "top-[46%] h-[22px] w-[2.5px]"
        }`}
      />
    </>
  );
}
