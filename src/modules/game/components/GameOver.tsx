import { Link } from "react-router";
import Button from "../../../components/Button";
import type { TScreenProps } from "../types";

export default function GameOver({ score, isMusicOn }: TScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-orange-500 space-y-4">
      <h1 className="text-4xl text-red-500 lg:text-6xl">🎃 Game Over!</h1>
      <p className="text-xl">Your final score: {score}/10</p>
      <Link to={"/"}>
        <Button className="cursor-pointer" role="button">
          Back Home
        </Button>
      </Link>
      <audio autoPlay muted={!isMusicOn}>
        <source src="/audio/blood-pop.wav" type="audio/wav" />
      </audio>
      <audio autoPlay muted={!isMusicOn}>
        <source src="/audio/game-lost.wav" type="audio/wav" />
      </audio>
    </div>
  );
}
