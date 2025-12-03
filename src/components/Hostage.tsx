export default function Hostage({ distance }: { distance: number }) {
  return (
    <div className="flex items-center">
      <img
        className="top-1 lg:top-[20%]"
        style={{ position: "absolute", right: `${distance}px` }}
        width={80}
        height={80}
        src="/svgs/vampire.svg"
        alt="Ghost"
      />

      <img
        className="top-1 lg:top-[20%]"
        style={{ position: "absolute", right: "-20px" }}
        width={80}
        height={80}
        src="/svgs/person.svg"
        alt="Person"
      />
    </div>
  );
}
