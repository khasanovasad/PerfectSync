import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => (
  <footer className="flex flex-col justify-center items-center py-12 w-full text-base text-gray-300 bg-slate-800 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
    <div className="flex flex-col px-8 max-w-full w-[1280px] max-md:px-5">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <Logo />
        <p className="self-stretch my-auto opacity-[var(--sds-size-stroke-border)]">
          © 2024 Perfect Sync. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
