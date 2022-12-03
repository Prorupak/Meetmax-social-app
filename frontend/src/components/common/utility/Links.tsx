import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  to: string;
  children: React.ReactNode;
  fontWeight?:
    | "normal"
    | "bold"
    | "extrabold"
    | "thin"
    | "light"
    | "medium"
    | "semibold"
    | any;
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | any;
  color?: string;
  className?: string;
  [props: string]: any;
}

const Links: React.FC<IProps> = ({
  to,
  children,
  fontWeight,
  fontSize,
  color,
  className,
  ...props
}) => {
  const weights = ["extrabold", "bold", "semibold", "medium", "light", "thin"];
  const weight = weights.includes(fontWeight) ? `font-${fontWeight}` : "normal";

  const sizes = ["xs", "sm", "base", "lg", "xl"];
  const size = sizes.includes(fontSize) ? `text-${fontSize}` : "text-base";

  return (
    <Link
      to={to}
      className={`${weight} ${size} ${
        color ? color : "text-blue-600"
      } ${className}`}
      {...props}>
      {children}
    </Link>
  );
};

export default Links;
