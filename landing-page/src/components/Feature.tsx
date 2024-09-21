import React from 'react';

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex flex-col flex-1 shrink p-6 bg-gray-50 basis-0 min-w-[240px] opacity-[var(--sds-size-stroke-border)] pb-[var(--sds-size-space-600)] pl-[var(--sds-size-space-600)] pr-[var(--sds-size-space-600)] pt-[var(--sds-size-space-600)] max-md:px-5">
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="object-contain w-12 aspect-square opacity-[var(--sds-size-stroke-border)]"
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab420048513467fbce708d4734bc5fbf09b7d94dd2969f778c1b89229e54f99b?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        />
      </a>
    </div>
  </div>
);

export default Feature;
