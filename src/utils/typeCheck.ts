export const typeCheck = (value: boolean | undefined | string) => {
  return typeof value === 'undefined'
    ? false
    : typeof value === 'boolean'
    ? value
    : typeof value === 'string'
    ? value.toLowerCase() === 'true'
    : false;
};
