import React from 'react';

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex flex-col flex-1 shrink bg-gray-50 basis-0 min-w-[240px] opacity-[var(--sds-size-stroke-border)]] p-5">
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="object-contain w-10 p-2 aspect-square opacity-[var(--sds-size-stroke-border)] bg-light-blue rounded-md"
    />
    <div className="flex flex-col mt-16 w-full max-md:mt-10">
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold text-gray-900 opacity-[var(--sds-size-stroke-border)]">
          {title}
        </h3>
        <p className="mt-2 text-base leading-6 opacity-[var(--sds-size-stroke-border)] text-slate-600">
          {description}
        </p>
      </div>
      <a
        href="#"
        className="flex overflow-hidden gap-2 justify-center items-center self-start mt-5 text-base font-semibold text-blue-700"
      >
        <span className="self-stretch my-auto opacity-[var(--sds-size-stroke-border)]">
          View integration
        </span>
        <img
          loading="lazy"
          src="/arrow-right.svg"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        />
      </a>
    </div>
  </div>
);

export default Feature;
