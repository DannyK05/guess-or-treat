import Button from "../../components/Button";

export default function Home() {
  return (
    <div className="w-full h-screen flex-col  space-y-8 flex items-center px-6 lg:justify-between bg-black lg:flex-row">
      <h1 className="text-8xl text-orange-500">
        Guess <br />
        <span className="text-white">or</span>
        <br /> Treat
      </h1>
      <Button role="button">Play</Button>
    </div>
  );
}
