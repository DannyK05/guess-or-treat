export type TScene = {
  key: string;
  image: string;
  options: string[];
  correctOption: string;
};

export type TScreenProps = {
  score: number;
  isMusicOn?: boolean;
  isSoundOn?: boolean;
};
