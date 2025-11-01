import { useState } from "react";
import useRandomSets from "../../hooks/useRandomSets";
import Button from "../../components/Button";

export default function Game() {
  const questions = useRandomSets();

  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurentIndex] = useState(0);

  const handleMouse = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleTouch = (e: React.TouchEvent) => {
    setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleCorrectAnswer = () => {
    if (currentIndex < questions.length - 1) {
      setScore(score + 2);
      setCurentIndex(currentIndex + 1);
    }
  };

  const handleWrongAnswer = () => {
    setScore(score - 1);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-orange-500">
        Summoning spooky questions...
      </div>
    );
  }

  if (currentIndex == questions.length - 1) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-orange-500 space-y-4">
        <p className="text-2xl">🎃 Game Over!</p>
        <p>Your final score: {score}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="w-full flex flex-col items-center justify-between lg:flex-row">
      <div
        className="relative w-1/2 h-screen overflow-hidden"
        onMouseMove={handleMouse}
        onTouchMove={handleTouch}
      >
        <img
          src={currentQuestion.image}
          alt={currentQuestion.key}
          className="w-full h-full"
        />

        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,1) 100%)`,
            maskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,1) 100%)`,
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
        />
      </div>

      <div className="w-1/2 border-l border-orange-500 h-screen flex items-center justify-center">
        <div className="flex w-full items-center flex-col space-y-4">
          <p className="text-red-500">Score: {score}</p>
          <p className="text-red-500">Guess Quickly</p>
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, key) => (
              <Button
                onClick={() => {
                  if (option === currentQuestion.correctOption) {
                    handleCorrectAnswer();
                    console.log("clicked");
                  } else {
                    handleWrongAnswer();
                  }
                }}
                className="w-full"
                key={key}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
