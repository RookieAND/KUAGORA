export const formatISODate = (isoDate: string) => {
  const formattedDate = isoDate.split("T")[0];
  return formattedDate;
};
