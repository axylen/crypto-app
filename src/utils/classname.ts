type ClassName = string | undefined | Record<string, any>;

export const cx = (...args: ClassName[]) => {
  const classNames = [];

  for (const cn of args) {
    if (typeof cn === "string") {
      classNames.push(cn);
    } else if (typeof cn === "object" && cn !== null) {
      for (const key in cn) {
        if (cn[key]) classNames.push(key);
      }
    }
  }
  return classNames.length === 0 ? undefined : classNames.join(" ");
};
