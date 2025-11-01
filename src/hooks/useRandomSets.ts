import { useState } from "react";
import { halloweenScenes } from "../modules/game/data";
import type { TScene } from "../modules/game/types";

export default function useRandomSets() {
  const [returnedQuestions] = useState(() => {
    const totalScenes = halloweenScenes.length;
    const selectedScenes: TScene[] = [];

    while (selectedScenes.length < 6) {
      const randomIndex = Math.floor(Math.random() * totalScenes);
      const randomScene = halloweenScenes[randomIndex];
      if (!selectedScenes.includes(randomScene))
        selectedScenes.push(randomScene);
    }

    return selectedScenes;
  });

  return returnedQuestions;
}
