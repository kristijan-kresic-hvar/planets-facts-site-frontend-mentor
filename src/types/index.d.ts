export type Planet = {
  name: string;
  overview: {
    content: string;
    source: string;
  };
  structure: {
    content: string;
    source: string;
  };
  geology: {
    content: string;
    source: string;
  };
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: {
    planet: string;
    internal: string;
    geology: string;
  } & Record<string, string>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type PlanetOption = {
  label: string;
  value: string;
};

export type OptionLabels = {
  [key: string]: string;
};

export type AnimationProps = {
  animation?: boolean;
  animationDuration?: number;
  animationDelay?: number;
};
