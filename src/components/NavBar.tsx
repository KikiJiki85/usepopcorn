import { ReactNode } from 'react';

interface NavBarProps {
  children: ReactNode;
}

function NavBar({ children }: NavBarProps) {
  return <nav className="nav-bar">{children}</nav>;
}

export default NavBar;
