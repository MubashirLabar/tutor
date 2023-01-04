import React, { CSSProperties, FC } from "react";
import { ColumnSize, generateColumnClasses, GridViewportKey } from "./const";

interface IColsProps extends Partial<Record<GridViewportKey, ColumnSize>> {
  children?: any;
  styles?: CSSProperties;
}
export const Col: FC<IColsProps> = ({ xs, sm, md, lg, children, styles }) => {
  return (
    <div className={generateColumnClasses({ xs, sm, md, lg })} style={styles}>
      {children}
    </div>
  );
};
