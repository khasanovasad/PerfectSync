import React from 'react';
import Feature from './Feature';

const featuresData = [
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/72e3a98481edab3a95344a517196a7f47a8a61b9171533982f8400cead41af3b?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607',
    title: 'Share team inboxes',
    description:
      'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8b81d0b0c406843745ff270492f8b2976bc14bd1d41eef34af9f98ce51d99372?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607',
    title: 'Share team inboxes',
    description:
      'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7a21e57929c5f9d5e712d82f44ed4abea3f31849dcea5c45fd5dea4c31c272ab?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607',
    title: 'Share team inboxes',
    description:
      'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d55037febe682f863c46f099f5351cd647ae01f4ddd284298ba17bfa1e9406c6?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607',
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
