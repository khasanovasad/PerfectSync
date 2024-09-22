import React from 'react';
import Button from './Button';

const Hero: React.FC = () => (
  <section className="flex flex-col items-center pt-24 w-full max-md:max-w-full">
    <div className="flex flex-col px-8 max-w-full w-[1280px] max-md:px-5">
      <div className="flex flex-col items-center w-full max-md:max-w-full">
        <div className="flex flex-col max-w-full text-center w-[1024px]">
          <h1 className="flex flex-col w-full text-6xl font-semibold tracking-tighter leading-tight text-gray-900 max-md:max-w-full max-md:text-4xl">
            <span className="opacity-[var(--sds-size-stroke-border)] max-md:max-w-full max-md:text-4xl">
              Unlock the Future of Real Estate with Our Predictive Scoring App
            </span>
          </h1>
          <p className="self-center mt-6 text-xl leading-8 opacity-[var(--sds-size-stroke-border)] text-slate-600 w-[768px] max-md:max-w-full">
            Navigating the real estate market is challenging—whether you’re an
            investor, a marketer, a real estate agency, or a bank.
          </p>
        </div>
        <div className="mt-12 text-lg font-semibold leading-loose text-white whitespace-nowrap max-md:mt-10">
          <Button label="Demo" icon="/play-circle.svg" />
        </div>
      </div>
    </div>
    <div className="flex flex-col px-8 mt-16 max-w-full w-[1280px] max-md:px-5 max-md:mt-10">
      <img
        loading="lazy"
        src="/app-screen.png"
        alt="Analytics Dashboard Preview"
        className="object-contain w-full aspect-[2.53] max-md:max-w-full"
      />
    </div>
  </section>
);

export default Hero;
