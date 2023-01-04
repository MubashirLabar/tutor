import React, { CSSProperties, FC } from "react";
import { horizontal, vertical } from "./const";

export interface IRowProps {
  horizontal?: horizontal;
  vertical?: vertical;
  reverse?: boolean;
  children?: any;
  styles?: CSSProperties;
}
export const Row: FC<IRowProps> = ({
  horizontal,
  vertical,
  reverse,
  children,
  styles,
}) => {
  const className = [horizontal, vertical, reverse ? "reverse" : ""].join(" ");
  return (
    <div style={styles} className={`row ${className}`}>
      {children}
    </div>
  );
};
