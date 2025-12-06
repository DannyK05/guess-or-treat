import { useEffect, useState } from "react";
import { Link } from "react-router";
import useRandomSets from "../../hooks/useRandomSets";
import Button from "../../components/Button";
import Hostage from "../../components/Hostage";

export default function Game() {
  const questions = useRandomSets();

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
  };

  const handleWrongAnswer = () => {
    setScore((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (hostageDistance > 0) {
        setHostageDistance((prev) => Math.max(prev - 10, 0));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [hostageDistance]);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-orange-500">
        Summoning spooky questions...
      </div>
    );
  }

  if (currentIndex == questions.length - 1 || hostageDistance == 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-orange-500 space-y-4">
        <h1 className="text-4xl text-red-500 lg:text-6xl">🎃 Game Over!</h1>
        <p className="text-xl">Your final score: {score}</p>
        <Link to={"/"}>
          <Button className="cursor-pointer" role="button">
            Back Home
          </Button>
        </Link>
      </div>
    );
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
    </div>
  );
}
