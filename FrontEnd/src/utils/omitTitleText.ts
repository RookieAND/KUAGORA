export const omitTitleText = (
  title: string,
  limit: number,
  omitStr: string
) => {
  return title.length < limit ? title : title.slice(0, limit) + omitStr;
};
