import React from 'react';
import TeamMember from './TeamMember';

const teamData = [
  {
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d4a9c04db8e0d7f3a3fee8ce53891c58726bf63558c7b15aa1877f38f719a838?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607',
    name: 'Asadbek KHASANOV',
    role: 'Full Stack Developer',
    description:
      'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.',
  },
  {
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/6bea86a4567843d46925ba6f4db28ffa7b3cde740c816f9a49ed83c29cda0ca4?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607',
    name: 'Olimjon TURSUNKULOV',
    role: 'Product Designer',
    description: 'Lead engineering teams at Figma, Pitch, and Protocol Labs.',
  },
  {
    image:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/867e99d2b0b775ea0ecddefa41df2fe8aa018524b4b30be77a6c023aea13f87d?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607',
    name: 'Bekhzod IRGASHEV',
    role: 'Full Stack Developer',
    description: 'Former frontend dev for Linear, Coinbase, and Postscript.',
  },
];

const Team: React.FC = () => (
  <section className="flex overflow-hidden flex-col items-center self-center py-24 w-full bg-[color:var(--sds-color-background-default-default)] opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
    <div className="flex flex-col px-8 max-w-full text-center w-[1280px] max-md:px-5">
      <div className="flex flex-col items-center w-full max-md:max-w-full">
        <div className="flex flex-col max-w-full w-[768px]">
          <div className="flex flex-col items-start w-full font-semibold max-md:max-w-full">
            <span className="text-base text-blue-700 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
              About us
            </span>
            <h2 className="mt-3 text-4xl tracking-tighter leading-none text-gray-900 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
              Meet our team
            </h2>
          </div>
          <p className="mt-5 text-xl leading-8 opacity-[var(--sds-size-stroke-border)] text-slate-600 max-md:max-w-full">
            Our philosophy is simple — hire a team of diverse, passionate people
            and foster a culture that empowers you to do your best work.
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-col px-8 mt-16 max-w-full w-[1280px] max-md:px-5 max-md:mt-10">
      <div className="flex flex-wrap gap-8 items-start w-full max-md:max-w-full">
        {teamData.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  </section>
);

export default Team;
