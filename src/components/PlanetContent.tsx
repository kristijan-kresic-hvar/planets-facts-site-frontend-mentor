import getPlanetColor from '@utils/getPlanetColor.ts';
import getActivePlanetImageString from '@utils/getActivePlanetImageString.ts';
import sourceIcon from '@assets/icon-source.svg';
import PlanetOptions from '@components/PlanetOptions.tsx';
import { planetOptions } from '@/constants';
import { useEffect, useRef, forwardRef, ForwardedRef } from 'react';
import { Planet, PlanetOption } from '@/types';
import { fadeIn } from '@/animations';
import PlanetImage from '@components/PlanetImage.tsx';

type PlanetContentProps = {
  activePlanet: Planet;
  activeOption: PlanetOption;
  setActiveOption: (option: PlanetOption) => void;
};

const WikiSource = ({ source }: { source: string }) => {
  return (
    <div className="h-max lg:mb-[2.44rem] justify-center md:justify-start flex items-center gap-[0.5rem]">
      <small className="text-white opacity-50 font-spartan text-[0.75rem] lg:text-[0.875rem]">
        Source {''} :
        <a
          className="font-bold underline capitalize"
          href={source}
          rel="noreferrer"
          target="_blank"
        >
          {''} Wikipedia
        </a>
      </small>
      <img src={sourceIcon} alt="open in new tab handler" />
    </div>
  );
};

const PlanetInfoText = forwardRef(
  (
    { infoText }: { infoText: string },
    ref: ForwardedRef<HTMLParagraphElement>
  ) => {
    return (
      <p
        ref={ref}
        className="max-w-[21.875rem] mx-auto md:mx-0 text-white lg:min-h-[13rem] text-[0.6875rem] lg:text-[0.875rem] py-[1.5rem] font-spartan leading-[1.5625rem] font-normal"
      >
        {infoText}
      </p>
    );
  }
);

const PlanetContent = ({
  activePlanet,
  activeOption,
  setActiveOption,
}: PlanetContentProps) => {
  const planetInfoTextRef = useRef<HTMLParagraphElement | null>(null);

  const showGeologyImage = activeOption.value === 'geology';

  useEffect(() => {
    fadeIn({
      element: planetInfoTextRef,
      duration: 0.5,
    });
  }, [activePlanet, activeOption]);

  return (
    <div className="mt-[2.44rem] md:mt-[3.38rem] lg:mt-[7.88rem] lg:grid lg:grid-cols-[2fr,1fr] lg:gap-[9.56rem] mx-auto place-items-center">
      <div className="w-full flex items-center justify-center min-h-[16rem] md:min-h-[26.375rem] lg:min-h-auto">
        <PlanetImage
          planetName={activePlanet.name}
          src={
            activePlanet.images[getActivePlanetImageString(activeOption.value)]
          }
          geologyImageSrc={activePlanet.images.geology}
          showGeologyImage={showGeologyImage}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row self-start md:gap-[4.31rem] justify-between lg:block mt-[2.31rem]">
        <div className="text-center md:text-left">
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[5rem] text-white font-antonio font-bold uppercase">
            {activePlanet.name}
          </h1>
          <PlanetInfoText
            ref={planetInfoTextRef}
            infoText={activePlanet[activeOption.value].content}
          />
          <WikiSource source={activePlanet[activeOption.value].source} />
        </div>
        <div className="shrink-1 self-center flex-1">
          <PlanetOptions
            activeOption={activeOption}
            activeBackground={getPlanetColor(activePlanet.name)}
            options={planetOptions}
            setActiveOption={setActiveOption}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanetContent;
