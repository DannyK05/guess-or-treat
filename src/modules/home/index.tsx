import { Link } from "react-router";
import Button from "../../components/Button";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="flex-col space-y-8 flex items-center px-6 bg-black">
        <h1 className="text-8xl text-center text-orange-500">
          Guess <br />
          <span className="text-white">or</span>
          <br /> Treat
        </h1>

        <Link to={"/game"}>
          <Button className="text-lg cursor-pointer" role="button">
            Play
          </Button>
        </Link>
      </div>

      <img
        className="absolute top-0 z-0 opacity-20"
        width={500}
        height={500}
        src="/svgs/bat.svg"
        alt="Bat"
        fetchPriority="high"
      />

      <img
        className="absolute left-[70%] bottom-[-100px] z-0 opacity-50"
        width={500}
        height={500}
        src="/svgs/pumpkin.svg"
        alt="Pumpkin"
      />

      <img
        className="absolute right-[70%] bottom-[-100px] z-0 opacity-50"
        width={500}
        height={500}
        src="/svgs/ghost.svg"
        alt="Ghost"
      />
      <p className="absolute bottom-10 text-orange-500">
        Made with 💖 by{" "}
        <a className="underline" href="https://github.com/DannyK05">
          Kxlade
        </a>
      </p>
    </div>
  );
}
