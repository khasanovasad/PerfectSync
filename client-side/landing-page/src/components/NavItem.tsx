import React from 'react';

interface NavItemProps {
  label: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, href }) => (
  <a
    href={href}
    className="flex overflow-hidden gap-2 justify-center items-center self-stretch my-auto whitespace-nowrap"
  >
    <div className="self-stretch my-auto opacity-[var(--sds-size-stroke-border)]">
      {label}
    </div>
  </a>
);

export default NavItem;
