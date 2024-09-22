import React from 'react';
import Button from './Button';

const CallToAction: React.FC = () => (
  <section className="flex overflow-hidden flex-col justify-center items-center py-24 w-full bg-gray-50 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
    <div className="flex flex-col px-8 max-w-full w-[1280px] max-md:px-5">
      <div className="flex flex-col items-center w-full max-md:max-w-full">
        <div className="flex flex-col max-w-full text-center w-[768px]">
          <h2 className="text-4xl font-semibold tracking-tighter leading-none text-gray-900 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
            Free DEMO
          </h2>
          <p className="mt-5 text-xl opacity-[var(--sds-size-stroke-border)] text-slate-600 max-md:max-w-full">
            Join over 4,000+ startups already growing with Perfect Sync.
          </p>
        </div>
        <div className="mt-10 text-base font-semibold text-white">
          <Button label="Get started" />
        </div>
      </div>
    </div>
  </section>
);

export default CallToAction;
