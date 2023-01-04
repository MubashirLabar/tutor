export type GridViewportKey = "xs" | "sm" | "md" | "lg";
export type ColumnSize =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";
export type horizontal = "center" | "end" | "start";
export type vertical = "top" | "center" | "bottom" | "middle";

export const generateColumnClasses = (
  config: Partial<Record<GridViewportKey, ColumnSize>>
) => {
  //@ts-ignore
  const className = Object.keys(config).map(
    //@ts-ignore
    (item) => `col-${item}-${config[`${item}`]}`
  );
  return className.join(" ");
};
