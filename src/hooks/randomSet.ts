import { halloweenScenes } from "../modules/game/data";
import type { TScene } from "../modules/game/types";

export default function randomSets() {
  const questions: TScene[] = [];

  while (questions.length < 6) {
    let random = Math.random();
    let scene = halloweenScenes[Math.round(random * 17)];
    if (!questions.includes(scene)) {
      questions.push(scene);
    }
  }

  return questions;
}
