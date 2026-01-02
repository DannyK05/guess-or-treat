import { useEffect, useRef, useState } from "react";
import useRandomSets from "../../hooks/useRandomSets";
import Button from "../../components/Button";
import Hostage from "../../components/Hostage";
import Win from "./components/Win";
import GameOver from "./components/GameOver";

export default function Game() {
  const questions = useRandomSets();

  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);

  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hostageDistance, setHostageDistance] = useState(200);

  const currentQuestion = questions[currentIndex];

  const handleMouse = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleTouch = (e: React.TouchEvent) => {
    setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleCorrectAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setScore((prev) => prev + 2);
      setCurrentIndex((prev) => prev + 1);
    }
    if (correctAudioRef) {
      correctAudioRef?.current?.play();
    }
  };

  const handleWrongAnswer = () => {
    if (score > 0) {
      setScore((prev) => prev - 1);
    }
    if (wrongAudioRef) {
      wrongAudioRef?.current?.play();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (hostageDistance > 0) {
        setHostageDistance((prev) => Math.max(prev - 10, 0));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (currentIndex == questions.length - 1 || hostageDistance == 0) {
    if (score > 7) {
      return <Win score={score} />;
    } else {
      return <GameOver score={score} />;
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-between  lg:flex-row lg:h-screen">
      <div
        className="w-full h-1/2 relative overflow-hidden lg:w-1/2 lg:h-screen"
        onMouseMove={handleMouse}
        onTouchMove={handleTouch}
      >
        <img
          src={currentQuestion.image}
          alt={currentQuestion.key}
          className="w-full h-full"
          fetchPriority="high"
          width={854}
          height={854}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            WebkitMaskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, transparent 0%,rgba(255,255,255,1) 80%, rgba(0,0,0,1) 100%)`,
            maskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, transparent 0%,rgba(255,255,255,1) 80%, rgba(0,0,0,1) 100%)`,
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
        />
      </div>

      <div className="w-full h-[45%s] relative px-4 border-t border-orange-500 flex items-center justify-center overflow-y-scroll overflow-x-hidden lg:w-1/2 lg:h-screen lg:overflow-hidden lg:border-l lg:border-t-0">
        <div className="flex w-full items-center flex-col pt-2">
          <h1 className="text-red-500 text-6xl">Save Bob</h1>
          <Hostage distance={hostageDistance} />
          <div className="flex w-full items-center flex-col pt-2 lg:mt-10 space-y-4">
            <p className="text-orange-500 text-2xl lg:text-6xl">
              Score: {score}
            </p>

            <h1 className="hidden text-red-500 text-xl lg:block">
              Guess Quickly
            </h1>

            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, key) => (
                <Button
                  onClick={() => {
                    if (option === currentQuestion.correctOption) {
                      handleCorrectAnswer();
                    } else {
                      handleWrongAnswer();
                    }
                  }}
                  className="w-full cursor-pointer"
                  key={key}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <audio autoPlay loop>
        <source src="/audio/lone-wolf-howling.wav" type="audio/wav" />
      </audio>

      <audio autoPlay loop>
        <source src="/audio/scary-graveyard-wind.wav" type="audio/wav" />
      </audio>

      <audio ref={correctAudioRef}>
        <source src="/audio/correct-tone.wav" type="audio/wav" />
      </audio>

      <audio ref={wrongAudioRef}>
        <source src="/audio/wrong-tone.wav" type="audio/wav" />
      </audio>
    </div>
  );
}
