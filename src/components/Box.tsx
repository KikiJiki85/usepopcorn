import { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
}

function Box({ children }: BoxProps) {
  return <div className="box">{children}</div>;
}

export default Box;
