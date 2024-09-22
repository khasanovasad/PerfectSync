import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex overflow-hidden flex-col bg-[color:var(--sds-color-background-default-default)] opacity-[var(--sds-size-stroke-border)]">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
