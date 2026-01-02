export default function Hostage({ distance }: { distance: number }) {
  return (
    <div className="w-1/2 flex relative mb-4 h-20 py-2 border-b border-dashed border-red-400  items-center">
      <img
        className="top-1 lg:top-[20%]"
        style={{ position: "absolute", right: `calc(${distance}px + 60px)` }}
        width={80}
        height={80}
        src="/svgs/ghost.svg"
        alt="Ghost"
      />

      <img
        className="top-1 lg:top-[20%]"
        style={{ position: "absolute", right: "0px" }}
        width={80}
        height={80}
        src="/gifs/run_anim.gif"
        alt="Person"
      />
    </div>
  );
}
