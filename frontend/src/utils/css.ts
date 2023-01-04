export interface IBEMComponent<
  M extends string | undefined = undefined,
  S extends string | undefined = undefined
> {
  modifier?: M | M[];
  state?: S | S[];
}

type StyleModule = {
  readonly [key: string]: string;
};

export const createModuleStyleExtractor = (styles: any) => {
  return (
    key: string | string[],
    conditional?: Record<string, boolean>,
    additional: string[] = []
  ) => {
    const moduleStyles = Array.isArray(key)
      ? key.filter(Boolean).map((k) => styles[k])
      : [styles[key]];

    if (conditional) {
      Object.keys(conditional).forEach((style) => {
        if (conditional[style]) {
          moduleStyles.push(styles[style]);
        }
      });
    }

    return additional.filter(Boolean).concat(moduleStyles).join(" ");
  };
};
