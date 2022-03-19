type ClassName = string | undefined;

export const cx = (...args: ClassName[]) => {
  const classNames = [];

  for (const cn of args) {
    if (typeof cn === 'string') {
      classNames.push(cn);
    }
  }

  return classNames.join(' ');
};
