import type { CSSProperties } from "react";

interface IconProps {
  src: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const Icon = ({ src, size = 18, className, style }: IconProps) => (
  <span
    className={`icon ${className ?? ""}`}
    style={{
      width: size,
      height: size,
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      ...style,
    }}
  />
);

export default Icon;
