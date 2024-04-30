export const CustomSeoUtils = {
  convertTitle: (title?: string) => {
    const titleSplit = title?.split(' ') ?? [''];
    return titleSplit.reduce(
      (value, currentValue) => value.toLocaleLowerCase() + '-' + currentValue.toLocaleLowerCase(),
      '',
    );
  },
};
