import React from 'react';

interface ButtonProps {
  label: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ label, icon }) => (
  <button className="flex overflow-hidden justify-center items-center rounded-md self-stretch px-4 py-2.5 my-auto text-sm leading-none text-white whitespace-nowrap bg-blue-600 border border-blue-600 border-solid shadow-sm gap-[var(--sds-size-space-200)] opacity-[var(--sds-size-stroke-border)]">
    {icon && (
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
      />
    )}
    <span className="self-stretch my-auto opacity-[var(--sds-size-stroke-border)]">
      {label}
    </span>
  </button>
);

export default Button;
