import React, { ReactNode } from "react";

interface IGradientProps {
  children: ReactNode;
  from: string;
  to: string;
  style?: object;
  className?: string;
}

const Gradient: React.FC<IGradientProps> = ({
  children,
  from,
  to,
  style,
  ...rest
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, " + from + " 0%, " + to + " 100%)",
        height: "100%",
        width: "100%",
        position: "relative",
        ...style,
      }}
      {...rest}>
      {children}
    </div>
  );
};

export default Gradient;
