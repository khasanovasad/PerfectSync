import React from 'react';
import Feature from './Feature';

const featuresData = [
  {
    icon: '/message-chat-circle.svg',
    title: 'Share team inboxes',
    description:
      'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
  },
  {
    icon: '/zap.svg',
    title: 'Share team inboxes',
    description:
      'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
  },
  {
    icon: '/chart-breakout-square.svg',
    title: 'Share team inboxes',
    description:
      'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
  },
  {
    icon: '/message-smile-circle.svg',
    title: 'Share team inboxes',
    description:
      'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
  },
];

const Features: React.FC = () => (
  <section className="flex overflow-hidden flex-col items-center self-center py-24 w-full bg-[color:var(--sds-color-background-default-default)] opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
    <div className="flex flex-col px-8 max-w-full w-[1280px] max-md:px-5">
      <div className="flex flex-col items-start w-full max-md:max-w-full">
        <div className="flex flex-col max-w-full w-[768px]">
          <div className="flex flex-col w-full font-semibold max-md:max-w-full">
            <span className="text-base text-blue-700 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
              Features
            </span>
            <h2 className="mt-3 text-4xl tracking-tighter leading-none text-gray-900 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
              Beautiful analytics to grow smarter
            </h2>
          </div>
          <p className="mt-5 text-xl leading-8 opacity-[var(--sds-size-stroke-border)] text-slate-600 max-md:max-w-full">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more users. Trusted by over 4,000
            startups.
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-col px-8 mt-16 max-w-full w-[1280px] max-md:px-5 max-md:mt-10">
      <div className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
        {featuresData.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;
