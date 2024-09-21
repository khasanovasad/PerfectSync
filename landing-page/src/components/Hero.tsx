import React from 'react';
import Button from './Button';

const Hero: React.FC = () => (
  <section className="flex flex-col items-center pt-24 w-full max-md:max-w-full">
    <div className="flex flex-col px-8 max-w-full w-[1280px] max-md:px-5">
      <div className="flex flex-col items-center w-full max-md:max-w-full">
        <div className="flex flex-col max-w-full text-center w-[1024px]">
          <h1 className="flex flex-col w-full text-6xl font-semibold tracking-tighter leading-tight text-gray-900 max-md:max-w-full max-md:text-4xl">
            <span className="opacity-[var(--sds-size-stroke-border)] max-md:max-w-full max-md:text-4xl">
              Beautiful analytics to grow smarter
            </span>
          </h1>
          <p className="self-center mt-6 text-xl leading-8 opacity-[var(--sds-size-stroke-border)] text-slate-600 w-[768px] max-md:max-w-full">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </p>
        </div>
        <div className="mt-12 text-lg font-semibold leading-loose text-white whitespace-nowrap max-md:mt-10">
          <Button
            label="Demo"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/9af12529ac6b9c533561018960f89fdbcf1b860b467a31153bb074ac9d05073b?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607"
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col px-8 mt-16 max-w-full w-[1280px] max-md:px-5 max-md:mt-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/40df09e484bf00c1e66aa59dd0287ff113642aa82319a0fb3d02a107b49ceac2?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607"
        alt="Analytics Dashboard Preview"
        className="object-contain w-full aspect-[2.53] max-md:max-w-full"
      />
    </div>
  </section>
);

export default Hero;
