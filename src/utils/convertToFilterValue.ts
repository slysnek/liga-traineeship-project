export const convertToFilterValue = (value: string) => {
  switch (value) {
    case 'undefined':
      return undefined;
    case 'true':
      return true;
    case 'false':
      return false;
  }
};
