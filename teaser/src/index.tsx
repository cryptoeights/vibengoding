import React from "react";
import { Composition, registerRoot } from "remotion";
import { VibengodingTeaser } from "./Teaser";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VibengodingTeaser"
      component={VibengodingTeaser}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
