import React from 'react';
import Button from './Button';
import Logo from './Logo';
import NavItem from './NavItem';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'About us', href: '#' },
];

const Header: React.FC = () => {
  return (
    <header className="flex overflow-hidden flex-col w-full bg-[color:var(--sds-color-background-default-default)] opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
      <div className="flex flex-col justify-center w-full font-semibold border-b-gray-100 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
        <div className="flex flex-col justify-center items-center w-full min-h-[80px] max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-center px-8 max-w-full w-[1280px] max-md:px-5">
            <div className="flex gap-10 items-center self-stretch my-auto text-base min-w-[240px] text-slate-600 max-md:max-w-full">
              <Logo />
              <nav className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
                {navItems.map((item, index) => (
                  <NavItem key={index} label={item.label} href={item.href} />
                ))}
              </nav>
            </div>
            <Button
              label="Demo"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bd17eba67dd5bfab6d57203d7525bbb39b71e40b081c21621f08f48514cca564?placeholderIfAbsent=true&apiKey=0e345544e3834ebaa05d7eb39071f607"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
