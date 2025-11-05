const replaceDot = (value: string) => {
  if (value.length > 1) {
    const split = value?.startsWith('.');
    if (split) {
      return value.replace('.', '');
    }
    return value
  }
  return value
};

export default replaceDot;
