import React from 'react';

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  description: string;
  company: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  image,
  name,
  role,
  description,
  company,
}) => (
  <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
    <img
      loading="lazy"
      src={image}
      alt={name}
      className="object-contain w-full aspect-[1.3]"
    />
    <div className="flex flex-col mt-6 w-full">
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold text-gray-900 opacity-[var(--sds-size-stroke-border)]">
          {name}
        </h3>
        <div className="mt-1 text-lg leading-loose text-blue-700 opacity-[var(--sds-size-stroke-border)]">
          {role}
        </div>
      </div>
      <p className="mt-4 text-base leading-6 opacity-[var(--sds-size-stroke-border)] text-slate-600">
        {description}
        <br />
        <span className="font-bold">{company}</span>
      </p>
    </div>
  </div>
);

export default TeamMember;
